import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../libs/supabase';
import { ROUTES } from '../constants';
import type { User, LoginCredentials, RegisterCredentials } from '../types';

export function useAuth() {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isAuthenticated = !!user;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (session?.user) {
				const userData: User = {
					id: parseInt(session.user.id, 10),
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
		});

		return () => subscription.unsubscribe();
	}, []);

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

				navigate(ROUTES.DASHBOARD);
				return data;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Login failed';
				setError(errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[navigate],
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
		await supabase.auth.signOut();
		navigate(ROUTES.LOGIN);
	}, [navigate]);

	const updateUser = useCallback(
		(updatedUser: Partial<User>) => {
			if (user) {
				setUser({ ...user, ...updatedUser });
			}
		},
		[user],
	);

	return {
		user,
		isAuthenticated,
		isLoading,
		error,
		login,
		register,
		logout,
		updateUser,
	};
}
