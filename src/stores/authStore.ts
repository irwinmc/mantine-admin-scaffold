import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types';

interface AuthState {
	user: AuthUser | null;
	isAuthenticated: boolean;
	token: string | null;
	refreshToken: string | null;
	setUser: (user: AuthUser | null) => void;
	setAuth: (user: AuthUser, token: string, refreshToken: string) => void;
	setToken: (token: string) => void;
	setRefreshToken: (refreshToken: string | null) => void;
	getToken: () => string | null;
	getRefreshToken: () => string | null;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			token: null,
			refreshToken: null,

			setUser: user =>
				set({
					user,
					isAuthenticated: !!user,
				}),

			setAuth: (user, token, refreshToken) =>
				set({
					user,
					token,
					refreshToken,
					isAuthenticated: true,
				}),

			setToken: token => set({ token }),

			setRefreshToken: refreshToken => set({ refreshToken }),

			getToken: () => get().token,

			getRefreshToken: () => get().refreshToken,

			clearAuth: () =>
				set({
					user: null,
					isAuthenticated: false,
					token: null,
					refreshToken: null,
				}),
		}),
		{
			name: 'auth-storage',
			partialize: state => ({
				user: state.user,
				token: state.token,
				refreshToken: state.refreshToken,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
