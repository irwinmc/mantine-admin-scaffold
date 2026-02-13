import ky, { HTTPError } from 'ky';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const getAuth = () => useAuthStore.getState();

// 用一个全局 Promise 防止并发重复刷新，逻辑更简单
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
	const refreshToken = getAuth().getRefreshToken();
	if (!refreshToken) {
		throw new Error('No refresh token available');
	}

	const response = await ky
		.post(`${API_BASE_URL}/v1/auth/refresh`, {
			json: { refreshToken },
		})
		.json<{ token: string; refreshToken?: string }>();

	const { token: newToken, refreshToken: newRefreshToken } = response;

	getAuth().setToken(newToken);
	if (newRefreshToken) {
		getAuth().setRefreshToken(newRefreshToken);
	}

	return newToken;
};

const getOrCreateRefreshPromise = () => {
	if (!refreshPromise) {
		refreshPromise = refreshAccessToken().finally(() => {
			refreshPromise = null;
		});
	}
	return refreshPromise;
};

const http = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: 10000,
	retry: { statusCodes: [401], limit: 1 },
	headers: {
		'Content-Type': 'application/json',
	},
	hooks: {
		beforeRequest: [
			request => {
				const token = getAuth().getToken();
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		beforeRetry: [
			async ({ request, error, retryCount }) => {
				// 第一次 401 时尝试刷新一次 token，并把新的 token 写回请求头
				if (retryCount === 0 && error instanceof HTTPError && error.response.status === 401) {
					try {
						const newToken = await getOrCreateRefreshPromise();
						request.headers.set('Authorization', `Bearer ${newToken}`);
					} catch (refreshError) {
						// 刷新失败：清空登录态，把错误抛给调用方处理（例如跳转登录页）
						getAuth().clearAuth();
						throw refreshError;
					}
				}
			},
		],
	},
});

export default http;
