/**
 * 用户相关类型定义
 */

export interface User {
	id: number;
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

export interface AuthResponse {
	user: User;
	token: string;
	refreshToken: string;
}

