import ky, { HTTPError } from 'ky';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const onRefreshed = (token: string) => {
	refreshSubscribers.forEach(callback => callback(token));
	refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
	refreshSubscribers.push(callback);
};

const refreshAccessToken = async (): Promise<string> => {
	const refreshToken = useAuthStore.getState().getRefreshToken();
	if (!refreshToken) {
		throw new Error('No refresh token available');
	}

	const response = await ky.post(`${API_BASE_URL}/v1/auth/refresh`, {
		json: { refreshToken },
	}).json<{ token: string; refreshToken?: string }>();

	const { token: newToken, refreshToken: newRefreshToken } = response;

	useAuthStore.getState().setToken(newToken);
	if (newRefreshToken) {
		useAuthStore.getState().setRefreshToken(newRefreshToken);
	}

	onRefreshed(newToken);
	isRefreshing = false;

	return newToken;
};

const http = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
	hooks: {
		beforeRequest: [
			request => {
				const token = useAuthStore.getState().getToken();
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		beforeRetry: [
			async ({ request, error, retryCount }) => {
				if (retryCount === 0 && error instanceof HTTPError && error.response.status === 401) {
					const originalRequest = request;

					if (isRefreshing) {
						return new Promise<void>(resolve => {
							addRefreshSubscriber(token => {
								originalRequest.headers.set('Authorization', `Bearer ${token}`);
								resolve();
							});
						});
					}

					isRefreshing = true;

					try {
						const newToken = await refreshAccessToken();
						request.headers.set('Authorization', `Bearer ${newToken}`);
					} catch (refreshError) {
						useAuthStore.getState().clearAuth();
						isRefreshing = false;
						throw refreshError;
					}
				}
			},
		],
		afterResponse: [
			async (_request, _options, response) => {
				if (response.status === 401 && !response.headers.get('X-Retrying')) {
					useAuthStore.getState().clearAuth();
				}
			},
		],
	},
});

export default http;
