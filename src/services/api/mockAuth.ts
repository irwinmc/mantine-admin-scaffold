import type { AuthCredentials, AuthResponse, AuthUser } from '@/types';

/**
 * 模拟认证 API
 *
 * 用于开发环境模拟登录，不依赖后端服务。
 * 默认开启，可通过环境变量 VITE_MOCK_ENABLED=false 关闭。
 *
 * 默认凭证：
 *   - 邮箱：admin@example.com
 *   - 密码：adminadmin
 */

// ============================================================
// Mock 配置
// ============================================================

const MOCK_ENABLED = import.meta.env.VITE_MOCK_ENABLED !== 'false';

const MOCK_CREDENTIALS = {
	email: 'admin@example.com',
	password: 'adminadmin',
};

const MOCK_USER: AuthUser = {
	id: 1,
	email: 'admin@example.com',
	displayName: 'Admin',
	phone: '',
	avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
};

// ============================================================
// Mock Token 管理
// ============================================================

/**
 * 生成模拟的 JWT 格式 token
 */
function generateMockToken(prefix: string): string {
	const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
	const payload = btoa(
		JSON.stringify({
			sub: MOCK_USER.id,
			email: MOCK_USER.email,
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 3600,
		}),
	);
	const signature = btoa(`${prefix}_mock_signature`);
	return `${header}.${payload}.${signature}`;
}

let mockAccessToken = generateMockToken('access');
let mockRefreshToken = generateMockToken('refresh');

// ============================================================
// Mock API 方法
// ============================================================

/**
 * 检查是否命中 mock（凭证匹配且 mock 已启用）
 */
export function isMockCredentials(credentials: AuthCredentials): boolean {
	return (
		MOCK_ENABLED &&
		credentials.email === MOCK_CREDENTIALS.email &&
		credentials.password === MOCK_CREDENTIALS.password
	);
}

/**
 * 检查给定的 refreshToken 是否为 mock token
 */
export function isMockRefreshToken(token: string): boolean {
	return MOCK_ENABLED && token === mockRefreshToken;
}

/**
 * 检查给定的 accessToken 是否为 mock token
 */
export function isMockAccessToken(token: string): boolean {
	return MOCK_ENABLED && token === mockAccessToken;
}

/**
 * Mock 登录
 */
export async function mockLogin(): Promise<AuthResponse> {
	await new Promise(resolve => setTimeout(resolve, 500));

	mockAccessToken = generateMockToken('access');
	mockRefreshToken = generateMockToken('refresh');

	return {
		accessToken: mockAccessToken,
		refreshToken: mockRefreshToken,
		user: { ...MOCK_USER },
	};
}

/**
 * Mock 刷新 token
 */
export async function mockRefresh(): Promise<AuthResponse> {
	await new Promise(resolve => setTimeout(resolve, 300));

	mockAccessToken = generateMockToken('access');
	mockRefreshToken = generateMockToken('refresh');

	return {
		accessToken: mockAccessToken,
		refreshToken: mockRefreshToken,
		user: { ...MOCK_USER },
	};
}

/**
 * Mock 获取当前用户
 */
export function mockGetCurrentUser(): AuthUser {
	return { ...MOCK_USER };
}
