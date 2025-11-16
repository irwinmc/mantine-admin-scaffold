import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, ROUTES } from '../constants';
import type { User, LoginCredentials, AuthResponse } from '../types';

/**
 * 认证 Hook
 * 管理用户认证状态和相关操作
 */
export function useAuth() {
	const navigate = useNavigate();
	const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA, null);
	const [token, setToken] = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 是否已认证
	const isAuthenticated = !!token && !!user;

	// 登录
	const login = useCallback(
		async (credentials: LoginCredentials) => {
			setIsLoading(true);
			setError(null);

			try {
				// TODO: 实现真实的 API 调用
				// const response = await authService.login(credentials);

				// 模拟 API 调用
				await new Promise(resolve => setTimeout(resolve, 1000));

				const mockResponse: AuthResponse = {
					user: {
						id: 1,
						name: 'Admin User',
						email: credentials.email,
						avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
						role: 'admin',
						status: 'active',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					token: 'mock-jwt-token',
					refreshToken: 'mock-refresh-token',
				};

				setUser(mockResponse.user);
				setToken(mockResponse.token);
				navigate(ROUTES.DASHBOARD);

				return mockResponse;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Login failed';
				setError(errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[navigate, setUser, setToken]
	);

	// 登出
	const logout = useCallback(() => {
		setUser(null);
		setToken(null);
		navigate(ROUTES.LOGIN);
	}, [navigate, setUser, setToken]);

	// 更新用户信息
	const updateUser = useCallback(
		(updatedUser: Partial<User>) => {
			if (user) {
				setUser({ ...user, ...updatedUser });
			}
		},
		[user, setUser]
	);

	return {
		user,
		token,
		isAuthenticated,
		isLoading,
		error,
		login,
		logout,
		updateUser,
	};
}
