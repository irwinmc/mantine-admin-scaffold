/**
 * 用户相关类型定义
 */

export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	role: UserRole;
	status: UserStatus;
	createdAt: Date;
	updatedAt: Date;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserFormValues {
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
}

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

// Supabase 返回的原始用户结构，用于从 Supabase 映射到应用内部的 User
export interface SupabaseUser {
	id: string;
	created_at: string;
	email?: string | null;
	user_metadata?: {
		name?: string;
		avatar_url?: string;
		role?: UserRole;
	};
}

export interface AuthResponse {
	user: User;
	token: string;
	refreshToken: string;
}
