import ky, { type KyInstance, type Options } from 'ky';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * HTTP 客户端
 *
 * 职责：
 * - 自动为每个请求添加 Authorization header（从 store 获取最新 token）
 * - 401 响应时自动清空本地认证状态
 * - Token 刷新由 Supabase 通过 onAuthStateChange 自动处理
 *
 * 使用：
 * - 普通请求：http.get/post/put/delete 会自动从 store 读取 token
 * - 特殊场景：可通过 headers 参数覆盖 Authorization（如 syncUser）
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
					async (_request, _options, response) => {
						// 401 表示 token 无效或过期，清空本地状态
						if (response.status === 401) {
							useAuthStore.getState().clearAuth();
							// 可选：触发全局事件通知 UI 跳转登录页
							window.dispatchEvent(new CustomEvent('auth:unauthorized'));
						}
						return response;
					},
				],
				beforeError: [
					error => {
						const { response } = error;
						if (response) {
							// 可以在这里统一处理错误信息格式化
							error.message = `Request failed: ${response.status} ${response.statusText}`;
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
