import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	token: string | null;
	refreshToken: string | null;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setRefreshToken: (refreshToken: string | null) => void;
	getToken: () => string | null;
	getRefreshToken: () => string | null;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
	user: null,
	isAuthenticated: false,
	token: null,
	refreshToken: null,

	setUser: user =>
		set({
			user,
			isAuthenticated: !!user,
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
}));
