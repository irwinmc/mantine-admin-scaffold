import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from './useLocalStorage';
import * as authApi from '@/services/api/auth';
import type { AuthUser, AuthCredentials } from '@/types';

export function useAuth() {
	const navigate = useNavigate();

	const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [rememberedEmail, setRememberedEmail] = useLocalStorage<string>('rememberedEmail', '');

	const login = useCallback(
		async (credentials: AuthCredentials) => {
			setIsLoading(true);
			setError(null);

			try {
				const { user, accessToken, refreshToken } = await authApi.login(credentials);

				setAuth(user, accessToken, refreshToken);

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
			await authApi.logout();
		} catch (err) {
			console.error('Logout API error:', err);
		} finally {
			clearAuth();
			setIsLoading(false);
			navigate('/login', { replace: true });
		}
	}, [clearAuth, navigate]);

	const updateUser = useCallback(
		(updatedUser: Partial<AuthUser>) => {
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
