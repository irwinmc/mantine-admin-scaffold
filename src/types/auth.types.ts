/**
 * 认证相关类型定义
 */

export interface AuthUser {
	id: number;
	email: string;
	displayName: string;
	phone?: string;
	avatar?: string;
}

export interface AuthCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
}
