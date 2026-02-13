import http from '@/services/http';
import type { SupabaseUser } from '@/types';

/**
 * 将 Supabase 用户信息同步到后端
 * - 认证仍由 Supabase 负责
 * - 后端只根据 Supabase 提供的信息做自身的用户建模 / 权限映射
 */
export const syncUser = async (supabaseUser: SupabaseUser, token: string): Promise<void> => {
	try {
		await http.post('users/sync', {
			json: {
				id: supabaseUser.id,
				email: supabaseUser.email,
				name: supabaseUser.user_metadata?.name || supabaseUser.email,
				avatar: supabaseUser.user_metadata?.avatar_url,
				role: supabaseUser.user_metadata?.role || 'user',
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.error('Error syncing user to backend:', error);
		throw error;
	}
};
