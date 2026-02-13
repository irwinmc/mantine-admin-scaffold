import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';

type ColorScheme = 'light' | 'dark' | 'auto';

interface ThemeState {
	colorScheme: ColorScheme;
	setColorScheme: (scheme: ColorScheme) => void;
	toggleColorScheme: () => void;
}

/**
 * 主题状态管理 Store
 * 使用 Zustand + Persist 中间件
 */
export const useThemeStore = create<ThemeState>()(
	persist(
		set => ({
			colorScheme: 'auto',

			setColorScheme: scheme =>
				set({
					colorScheme: scheme,
				}),

			toggleColorScheme: () =>
				set(state => ({
					colorScheme: state.colorScheme === 'dark' ? 'light' : 'dark',
				})),
		}),
		{
			name: STORAGE_KEYS.THEME,
		},
	),
);
