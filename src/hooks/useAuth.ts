import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../libs/supabase';
import { useAuthStore } from '../store/authStore';
import { useLocalStorage } from './useLocalStorage';
import type { User, LoginCredentials } from '../types';

interface SupabaseUser {
	id: string;
	email?: string | null;
	user_metadata?: {
		name?: string;
		avatar_url?: string;
		role?: string;
	};
}

const syncUserToBackend = async (supabaseUser: SupabaseUser, accessToken: string): Promise<void> => {
	try {
		const response = await fetch('/api/auth/sync', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				id: supabaseUser.id,
				email: supabaseUser.email,
				name: supabaseUser.user_metadata?.name || supabaseUser.email,
				avatar: supabaseUser.user_metadata?.avatar_url,
				role: supabaseUser.user_metadata?.role || 'user',
			}),
		});

		if (!response.ok) {
			console.error('Failed to sync user to backend');
		}
	} catch (error) {
		console.error('Error syncing user to backend:', error);
	}
};

export function useAuth() {
	const navigate = useNavigate();

	const { user, isAuthenticated, setUser } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [rememberedEmail, setRememberedEmail] = useLocalStorage<string>('rememberedEmail', '');

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
					setRememberedEmail(credentials.email);
				} else {
					setRememberedEmail('');
				}

				if (data.user) {
					const accessToken = data.session?.access_token;
					if (accessToken) {
						await syncUserToBackend(data.user, accessToken);
					}
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
		[navigate, setRememberedEmail],
	);

	const logout = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			await supabase.auth.signOut();
			setUser(null);
			navigate('/login');
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
