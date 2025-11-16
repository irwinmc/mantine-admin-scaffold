import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	login: (user: User, token: string) => void;
	logout: () => void;
}

/**
 * 认证状态管理 Store
 * 使用 Zustand + Persist 中间件
 */
export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			user: null,
			token: null,
			isAuthenticated: false,

			setUser: user =>
				set({
					user,
					isAuthenticated: !!user,
				}),

			setToken: token =>
				set({
					token,
				}),

			login: (user, token) =>
				set({
					user,
					token,
					isAuthenticated: true,
				}),

			logout: () =>
				set({
					user: null,
					token: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: STORAGE_KEYS.AUTH_TOKEN,
		}
	)
);
