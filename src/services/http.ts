import ky from 'ky';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const getAuth = () => useAuthStore.getState();

/**
 * HTTP 客户端职责：
 * - 每个请求自动带上当前 Supabase access token
 * - 后端返回 401 时清空本地登录态（具体跳转登录由上层处理）
 * 刷新 token 完全交给 Supabase 自己处理（通过 onAuthStateChange 同步到 store）
 */
const http = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: 10000,
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
		afterResponse: [
			(_request, _options, response) => {
				if (response.status === 401) {
					getAuth().clearAuth();
				}
			},
		],
	},
});

export default http;
