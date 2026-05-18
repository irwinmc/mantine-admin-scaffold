import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosError,
	type InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// ── Token 刷新队列管理 ──────────────────────────────────────────

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
	refreshSubscribers.forEach(cb => cb(token));
	refreshSubscribers = [];
}

async function handleTokenRefresh(): Promise<string | null> {
	const refreshToken = useAuthStore.getState().getRefreshToken();

	if (!refreshToken) {
		useAuthStore.getState().clearAuth();
		window.location.href = '/login';
		return null;
	}

	try {
		const { data } = await axios.post<{ token: string; refreshToken: string }>(
			`${API_BASE_URL}/auth/refresh`,
			{ refreshToken },
			{ timeout: 10000 },
		);

		useAuthStore.getState().setToken(data.token);
		useAuthStore.getState().setRefreshToken(data.refreshToken);

		return data.token;
	} catch {
		useAuthStore.getState().clearAuth();
		window.location.href = '/login';
		return null;
	}
}

// ── 重试辅助 ────────────────────────────────────────────────────

interface RetryableConfig extends InternalAxiosRequestConfig {
	_retryCount?: number;
	_isTokenRetry?: boolean;
}

const RETRY_LIMIT = 2;
const RETRY_STATUS_CODES = [408, 413, 429, 500, 502, 503, 504];

function shouldRetry(error: AxiosError): boolean {
	if (!error.response) return true; // 网络错误
	return RETRY_STATUS_CODES.includes(error.response.status);
}

// ── 错误格式化 ───────────────────────────────────────────────────

function normalizeError(error: AxiosError): Error {
	if (error.response) {
		const responseData = error.response.data as { message?: string } | undefined;
		const msg = responseData?.message ?? `Request failed: ${error.response.status} ${error.response.statusText}`;
		return new Error(msg);
	}
	if (error.request) {
		return new Error('Network error: No response received');
	}
	return error as Error;
}

// ── HttpClient ───────────────────────────────────────────────────

/**
 * HTTP 客户端（基于 axios）
 *
 * 职责：
 * - 自动为每个请求添加 Authorization header
 * - 401 响应时自动刷新 token 并重试
 * - 网络错误/5xx 自动重试（最多 2 次）
 * - Token 刷新失败时清空认证状态并跳转登录页
 * - 统一错误格式化，提取服务端返回的 message
 */
class HttpClient {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: API_BASE_URL,
			timeout: 30000,
		});

		// ── 请求拦截器：注入 Authorization ──
		this.client.interceptors.request.use(config => {
			if (!config.headers.Authorization) {
				const token = useAuthStore.getState().getToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
			return config;
		});

		// ── 响应拦截器：重试、401 刷新、错误格式化 ──
		this.client.interceptors.response.use(
			response => response,
			async (error: AxiosError) => {
				const config = error.config as RetryableConfig | undefined;

				// -- 重试逻辑 --
				if (config && (config._retryCount ?? 0) < RETRY_LIMIT && shouldRetry(error)) {
					config._retryCount = (config._retryCount ?? 0) + 1;
					const delay = 300 * 2 ** (config._retryCount - 1);
					await new Promise(r => setTimeout(r, delay));
					return this.client(config);
				}

				// -- 401 处理 --
				if (error.response?.status === 401 && config && !config._isTokenRetry) {
					const url = config.url ?? '';

					// 刷新 token 接口自身 401，直接踢出
					if (url.includes('/auth/refresh')) {
						useAuthStore.getState().clearAuth();
						window.location.href = '/login';
						return Promise.reject(error);
					}

					// 其他请求 401：排队等待 token 刷新
					if (isRefreshing) {
						return new Promise(resolve => {
							subscribeTokenRefresh((newToken: string) => {
								config.headers.Authorization = `Bearer ${newToken}`;
								resolve(this.client(config));
							});
						});
					}

					// 自己负责刷新
					isRefreshing = true;
					config._isTokenRetry = true;

					try {
						const newToken = await handleTokenRefresh();
						if (newToken) {
							onTokenRefreshed(newToken);
							config.headers.Authorization = `Bearer ${newToken}`;
							return this.client(config);
						}
					} finally {
						isRefreshing = false;
					}
				}

				return Promise.reject(normalizeError(error));
			},
		);
	}

	// ── HTTP 方法 ──────────────────────────────────────────────

	async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const { data } = await this.client.get<T>(url, config);
		return data;
	}

	async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.post<T>(url, data, config);
		return response.data;
	}

	async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.put<T>(url, data, config);
		return response.data;
	}

	async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.patch<T>(url, data, config);
		return response.data;
	}

	async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const { data } = await this.client.delete<T>(url, config);
		return data;
	}

	/** 获取原始 axios 实例（用于特殊场景） */
	get raw(): AxiosInstance {
		return this.client;
	}
}

const http = new HttpClient();

export default http;
export type { AxiosRequestConfig };
