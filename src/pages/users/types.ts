/**
 * User 相关类型定义
 */

export interface User {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'manager' | 'user';
	status: 'active' | 'inactive' | 'pending';
	avatar: string;
	joinDate: Date;
	phone?: string;
	department?: string;
}

export type UserRole = User['role'];
export type UserStatus = User['status'];
