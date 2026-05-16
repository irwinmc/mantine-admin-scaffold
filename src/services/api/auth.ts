import http from '@/services/http';
import { useAuthStore } from '@/stores/authStore';
import { isMockCredentials, isMockRefreshToken, mockLogin, mockRefresh, mockGetCurrentUser } from './mockAuth';
import type { AuthCredentials, AuthResponse, AuthUser } from '@/types';

/**
 * 认证相关 API
 *
 * Mock 模式：当凭证匹配 admin@example.com / adminadmin 时自动使用模拟数据，
 * 其余情况走真实后端 API。
 * 可通过 VITE_MOCK_ENABLED=false 关闭 mock。
 */

/**
 * 用户登录
 */
export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
	if (isMockCredentials(credentials)) {
		return mockLogin();
	}

	const response = await http.post<{ data: AuthResponse }>('auth/login', {
		json: {
			email: credentials.email,
			password: credentials.password,
		},
	});
	return response.data;
};

/**
 * 刷新 token
 */
export const refreshToken = async (refreshTokenStr: string): Promise<AuthResponse> => {
	if (isMockRefreshToken(refreshTokenStr)) {
		return mockRefresh();
	}

	const response = await http.post<AuthResponse>('auth/refresh', {
		json: { refreshToken: refreshTokenStr },
	});
	return response;
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async (): Promise<AuthUser> => {
	const token = useAuthStore.getState().getToken();
	if (token && isMockRefreshToken(token)) {
		return mockGetCurrentUser();
	}

	const response = await http.get<AuthUser>('auth/me');
	return response;
};

/**
 * 登出（可选：通知后端使 token 失效）
 */
export const logout = async (): Promise<void> => {
	try {
		await http.post('auth/logout');
	} catch (error) {
		// 登出失败不影响前端清空状态
		console.error('Logout API error:', error);
	}
};
