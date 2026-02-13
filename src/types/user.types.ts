/**
 * 用户相关类型定义
 */

export interface User {
	id: number;
	email: string;
	displayName: string;
	phone?: string;
	avatar?: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}
