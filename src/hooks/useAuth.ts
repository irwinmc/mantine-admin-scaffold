import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from './useLocalStorage';
import { syncUser } from '@/services/api/users';
import type { User, LoginCredentials, SupabaseUser, UserRole } from '@/types';

export function useAuth() {
	const navigate = useNavigate();

	const { user, isAuthenticated, setUser, setToken, setRefreshToken } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [rememberedEmail, setRememberedEmail] = useLocalStorage<string>('rememberedEmail', '');

	// 使用 Supabase 的 Session 更新本地认证状态（User + token）
	const updateAuthFromSession = useCallback(
		(session: { user: SupabaseUser; access_token: string; refresh_token?: string } | null) => {
			if (session?.user) {
				const userData: User = {
					id: session.user.id,
					name: session.user.user_metadata?.name || session.user.email || 'User',
					email: session.user.email || '',
					avatar: session.user.user_metadata?.avatar_url,
					role: (session.user.user_metadata?.role as UserRole) || 'user',
					status: 'active',
					createdAt: new Date(session.user.created_at),
					updatedAt: new Date(),
				};

				setToken(session.access_token);
				setRefreshToken(session.refresh_token ?? null);
				setUser(userData);
			} else {
				setUser(null);
				setToken(null);
				setRefreshToken(null);
			}
		},
		[setUser, setToken, setRefreshToken],
	);

	useEffect(() => {
		const checkInitialAuth = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				updateAuthFromSession({
					user: session.user as unknown as SupabaseUser,
					access_token: session.access_token,
					refresh_token: session.refresh_token,
				});

				// 刷新时也同步用户数据，确保后端数据最新
				try {
					await syncUser(session.user as SupabaseUser, session.access_token);
				} catch (error) {
					console.error('Failed to sync user on refresh:', error);
				}
			} else {
				updateAuthFromSession(null);
			}

			setIsLoading(false);
		};

		checkInitialAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (session) {
				updateAuthFromSession({
					user: session.user as unknown as SupabaseUser,
					access_token: session.access_token,
					refresh_token: session.refresh_token,
				});

				// TOKEN_REFRESHED 事件时也同步，确保 token 刷新后数据一致
				if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
					try {
						await syncUser(session.user as SupabaseUser, session.access_token);
					} catch (error) {
						console.error('Failed to sync user on auth state change:', error);
					}
				}
			} else {
				updateAuthFromSession(null);
			}

			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, [updateAuthFromSession]);

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
					setRememberedEmail(credentials.email);
				} else {
					setRememberedEmail('');
				}

				if (data.user && data.session?.access_token) {
					const accessToken = data.session.access_token;
					const refreshToken = data.session.refresh_token;

					updateAuthFromSession({
						user: data.user as SupabaseUser,
						access_token: accessToken,
						refresh_token: refreshToken ?? undefined,
					});

					await syncUser(data.user as SupabaseUser, accessToken);
					navigate('/');
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
		[navigate, setRememberedEmail, updateAuthFromSession],
	);

	const logout = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			await supabase.auth.signOut();
			setUser(null);
			setToken(null);
			setRefreshToken(null);
			navigate('/login');
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Logout failed';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [navigate, setUser, setToken, setRefreshToken]);

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
