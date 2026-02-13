import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from './useLocalStorage';
import * as authApi from '@/services/api/auth';
import type { User, LoginCredentials } from '@/types';

export function useAuth() {
	const navigate = useNavigate();

	const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [rememberedEmail, setRememberedEmail] = useLocalStorage<string>('rememberedEmail', '');

	// 监听未授权事件，自动跳转登录页
	useEffect(() => {
		const handleUnauthorized = () => {
			navigate('/login', { replace: true });
		};

		window.addEventListener('auth:unauthorized', handleUnauthorized);
		return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
	}, [navigate]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			setIsLoading(true);
			setError(null);

			try {
				const { user, token, refreshToken } = await authApi.login(credentials);

				// 保存认证信息到 store（会自动持久化到 localStorage）
				setAuth(user, token, refreshToken);

				// 记住邮箱
				if (credentials.rememberMe) {
					setRememberedEmail(credentials.email);
				} else {
					setRememberedEmail('');
				}

				navigate('/');
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Login failed';
				setError(errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[navigate, setAuth, setRememberedEmail],
	);

	const logout = useCallback(async () => {
		setIsLoading(true);
		try {
			// 调用后端登出 API（可选，用于使 token 失效）
			await authApi.logout();
		} catch (err) {
			console.error('Logout API error:', err);
		} finally {
			// 无论 API 是否成功，都清空本地状态
			clearAuth();
			setIsLoading(false);
			navigate('/login', { replace: true });
		}
	}, [clearAuth, navigate]);

	const updateUser = useCallback(
		(updatedUser: Partial<User>) => {
			if (user) {
				const newUser = { ...user, ...updatedUser };
				useAuthStore.getState().setUser(newUser);
			}
		},
		[user],
	);

	const clearRememberedEmail = useCallback(() => {
		setRememberedEmail('');
	}, [setRememberedEmail]);

	return {
		user,
		isAuthenticated,
		isLoading,
		error,
		rememberedEmail,
		login,
		logout,
		updateUser,
		clearRememberedEmail,
	};
}
