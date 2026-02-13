import ky, { type KyInstance, type Options } from 'ky';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// 标记是否正在刷新 token，避免并发刷新
let isRefreshing = false;

// 存储等待 token 刷新的请求队列
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * 添加请求到刷新队列
 */
function subscribeTokenRefresh(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

/**
 * 通知所有等待的请求使用新 token
 */
function onTokenRefreshed(token: string) {
	refreshSubscribers.forEach(callback => callback(token));
	refreshSubscribers = [];
}

/**
 * 刷新 token
 */
async function handleTokenRefresh(): Promise<string | null> {
	const refreshToken = useAuthStore.getState().getRefreshToken();

	if (!refreshToken) {
		useAuthStore.getState().clearAuth();
		window.location.href = '/login';
		return null;
	}

	try {
		// 调用刷新 token API
		const response = await ky
			.post(`${API_BASE_URL}/auth/refresh`, {
				json: { refreshToken },
				timeout: 10000,
			})
			.json<{ token: string; refreshToken: string }>();

		// 更新 store 中的 token
		useAuthStore.getState().setToken(response.token);
		useAuthStore.getState().setRefreshToken(response.refreshToken);

		return response.token;
	} catch (error) {
		// 刷新失败，清空认证状态
		useAuthStore.getState().clearAuth();
		window.location.href = '/login';
		return null;
	}
}

/**
 * HTTP 客户端
 *
 * 职责：
 * - 自动为每个请求添加 Authorization header
 * - 401 响应时自动刷新 token 并重试
 * - Token 刷新失败时清空认证状态
 *
 * 使用：
 * - 普通请求：http.get/post/put/delete 会自动处理 token
 * - 特殊场景：可通过 headers 参数覆盖 Authorization
 */
class HttpClient {
	private client: KyInstance;

	constructor() {
		this.client = ky.create({
			prefixUrl: API_BASE_URL,
			timeout: 30000,
			retry: {
				limit: 2,
				methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
				statusCodes: [408, 413, 429, 500, 502, 503, 504],
			},
			hooks: {
				beforeRequest: [
					request => {
						// 如果请求已经设置了 Authorization，则不覆盖
						if (!request.headers.has('Authorization')) {
							const token = useAuthStore.getState().getToken();
							if (token) {
								request.headers.set('Authorization', `Bearer ${token}`);
							}
						}
					},
				],
				afterResponse: [
					async (request, _options, response) => {
						// 401 表示 token 无效或过期
						if (response.status === 401) {
							// 如果是刷新 token 的请求失败，直接返回
							if (request.url.includes('/auth/refresh')) {
								useAuthStore.getState().clearAuth();
								window.location.href = '/login';
								return response;
							}

							// 如果正在刷新，等待刷新完成
							if (isRefreshing) {
								return new Promise(resolve => {
									subscribeTokenRefresh(async (newToken: string) => {
										// 使用新 token 重试请求
										request.headers.set('Authorization', `Bearer ${newToken}`);
										const retryResponse = await ky(request);
										resolve(retryResponse);
									});
								});
							}

							// 开始刷新 token
							isRefreshing = true;

							try {
								const newToken = await handleTokenRefresh();

								if (newToken) {
									// 通知所有等待的请求
									onTokenRefreshed(newToken);

									// 使用新 token 重试当前请求
									request.headers.set('Authorization', `Bearer ${newToken}`);
									return ky(request);
								}
							} finally {
								isRefreshing = false;
							}
						}

						return response;
					},
				],
				beforeError: [
					async error => {
						const { response } = error;
						if (response) {
							// 尝试解析错误信息
							try {
								const errorData = (await response.json()) as { message?: string };
								error.message = errorData.message || `Request failed: ${response.status}`;
							} catch {
								error.message = `Request failed: ${response.status} ${response.statusText}`;
							}
						}
						return error;
					},
				],
			},
		});
	}

	/**
	 * GET 请求
	 */
	async get<T = unknown>(url: string, options?: Options): Promise<T> {
		return this.client.get(url, options).json<T>();
	}

	/**
	 * POST 请求
	 */
	async post<T = unknown>(url: string, options?: Options): Promise<T> {
		return this.client.post(url, options).json<T>();
	}

	/**
	 * PUT 请求
	 */
	async put<T = unknown>(url: string, options?: Options): Promise<T> {
		return this.client.put(url, options).json<T>();
	}

	/**
	 * PATCH 请求
	 */
	async patch<T = unknown>(url: string, options?: Options): Promise<T> {
		return this.client.patch(url, options).json<T>();
	}

	/**
	 * DELETE 请求
	 */
	async delete<T = unknown>(url: string, options?: Options): Promise<T> {
		return this.client.delete(url, options).json<T>();
	}

	/**
	 * 获取原始 ky 实例（用于特殊场景）
	 */
	get raw(): KyInstance {
		return this.client;
	}
}

const http = new HttpClient();

export default http;
