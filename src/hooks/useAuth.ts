import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../libs/supabase';
import { ROUTES } from '../constants';
import { useAuthStore } from '../store/authStore';
import { useLocalStorage } from './useLocalStorage';
import type { User, LoginCredentials, RegisterCredentials, RememberedEmailData } from '../types';

export function useAuth() {
	const navigate = useNavigate();
	const { user, isAuthenticated, setUser } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [rememberedEmailData, setRememberedEmailData] = useLocalStorage<RememberedEmailData | null>(
		'rememberedEmail',
		null,
	);

	useEffect(() => {
		const checkInitialAuth = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (session?.user) {
				const userData: User = {
					id: session.user.id,
					name: session.user.user_metadata?.name || session.user.email || 'User',
					email: session.user.email || '',
					avatar: session.user.user_metadata?.avatar_url,
					role: session.user.user_metadata?.role || 'user',
					status: 'active',
					createdAt: new Date(session.user.created_at),
					updatedAt: new Date(),
				};
				setUser(userData);
			}
			setIsLoading(false);
		};

		checkInitialAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (session?.user) {
				const userData: User = {
					id: session.user.id,
					name: session.user.user_metadata?.name || session.user.email || 'User',
					email: session.user.email || '',
					avatar: session.user.user_metadata?.avatar_url,
					role: session.user.user_metadata?.role || 'user',
					status: 'active',
					createdAt: new Date(session.user.created_at),
					updatedAt: new Date(),
				};
				setUser(userData);
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, [setUser]);

	const login = useCallback(
		async (credentials: LoginCredentials) => {
			setIsLoading(true);
			setError(null);

			try {
				const { data, error: authError } = await supabase.auth.signInWithPassword({
					email: credentials.email,
					password: credentials.password,
				});

				if (authError) throw authError;

				if (credentials.rememberMe) {
					const currentData = rememberedEmailData || {
						email: credentials.email,
						lastLoginAt: new Date().toISOString(),
						loginCount: 0,
						isRemembered: true,
					};

					setRememberedEmailData({
						...currentData,
						email: credentials.email,
						lastLoginAt: new Date().toISOString(),
						loginCount: currentData.loginCount + 1,
						isRemembered: true,
					});
				} else {
					setRememberedEmailData(null);
				}

				if (data.user) {
					navigate(ROUTES.DASHBOARD);
				}
				return data;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Login failed';
				setError(errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[navigate, setRememberedEmailData, rememberedEmailData],
	);

	const register = useCallback(async (credentials: RegisterCredentials) => {
		setIsLoading(true);
		setError(null);

		try {
			const { data, error: authError } = await supabase.auth.signUp({
				email: credentials.email,
				password: credentials.password,
				options: {
					data: {
						name: credentials.name,
					},
				},
			});

			if (authError) throw authError;

			return data;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Registration failed';
			setError(errorMessage);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			await supabase.auth.signOut();
			setUser(null);
			// 登出时不清除记住的邮箱，用户可能还想用同一个邮箱登录
			navigate(ROUTES.LOGIN);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Logout failed';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [navigate, setUser]);

	const updateUser = useCallback(
		(updatedUser: Partial<User>) => {
			if (user) {
				const newUser = { ...user, ...updatedUser };
				setUser(newUser);
			}
		},
		[user, setUser],
	);

	const clearRememberedEmail = useCallback(() => {
		setRememberedEmailData(null);
	}, [setRememberedEmailData]);

	return {
		user,
		isAuthenticated,
		isLoading,
		error,
		rememberedEmailData,
		login,
		register,
		logout,
		updateUser,
		clearRememberedEmail,
	};
}
