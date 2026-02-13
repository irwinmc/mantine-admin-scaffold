import http from '@/services/http';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types';

/**
 * 认证相关 API
 */

/**
 * 用户登录
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
	const response = await http.post<AuthResponse>('auth/login', {
		json: {
			email: credentials.email,
			password: credentials.password,
		},
	});
	return response;
};

/**
 * 用户注册
 */
export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
	const response = await http.post<AuthResponse>('auth/register', {
		json: credentials,
	});
	return response;
};

/**
 * 刷新 token
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
	const response = await http.post<AuthResponse>('auth/refresh', {
		json: { refreshToken },
	});
	return response;
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async (): Promise<User> => {
	const response = await http.get<User>('auth/me');
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
