import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import type { OrderDetail } from '../types';
import { mockOrderDetail } from '../data/mockData';

interface UseOrderDetailOptions {
	orderId?: string;
}

interface UseOrderDetailReturn {
	orderDetail: OrderDetail | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useOrderDetail({ orderId }: UseOrderDetailOptions): UseOrderDetailReturn {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchOrderDetail = async () => {
		if (!orderId) {
			navigate('/orders');
			return;
		}

		try {
			setLoading(true);
			setError(null);

			// 模拟 API 延迟
			await new Promise(resolve => setTimeout(resolve, 500));

			// 模拟获取订单详情
			// 在实际应用中，这里会调用 API
			// const response = await fetch(`/api/orders/${orderId}`);
			// const data = await response.json();

			// 目前使用模拟数据
			setOrderDetail(mockOrderDetail);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';
			setError(errorMessage);

			console.error('Failed to load order detail:', err);
			notifications.show({
				title: t('messages.error'),
				message: t('messages.error_load'),
				color: 'red',
			});
			navigate('/orders');
		} finally {
			setLoading(false);
		}
	};

	const refetch = () => {
		fetchOrderDetail();
	};

	useEffect(() => {
		fetchOrderDetail();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId]);

	return {
		orderDetail,
		loading,
		error,
		refetch,
	};
}
