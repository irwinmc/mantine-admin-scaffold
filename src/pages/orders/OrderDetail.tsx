/**
 * OrderDetail 页面 - 订单详情
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Stack, Grid, Text, Group, Button, Badge, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import type { OrderDetail } from './types';
import {
	OrderProductsCard,
	OrderStatusCard,
	LogisticsCard,
	CustomerCard,
	AddressCard,
	PaymentCard,
} from './components';
import classes from './OrderDetail.module.css';

// 模拟订单详情数据
const mockOrderDetail: OrderDetail = {
	id: 'VL2667',
	orderNumber: 'VL2667',
	orderDate: new Date('2021-12-15'),
	status: 'shipped',
	items: [
		{
			id: '1',
			productId: 'P001',
			productName: 'Sweatshirt for Men (Pink)',
			productImage: '/images/products/sweatshirt-pink.jpg',
			color: 'Pink',
			size: 'M',
			price: 119.99,
			quantity: 2,
			rating: 4.5,
			totalAmount: 239.98,
		},
		{
			id: '2',
			productId: 'P002',
			productName: 'Noise NoiseFit Endure Smart Watch',
			productImage: '/images/products/smart-watch.jpg',
			color: 'Black',
			size: '32.5mm',
			price: 94.99,
			quantity: 1,
			rating: 4.5,
			totalAmount: 94.99,
		},
		{
			id: '3',
			productId: 'P003',
			productName: '350 ml Glass Grocery Container',
			productImage: '/images/products/glass-container.jpg',
			color: 'White',
			size: '350 ml',
			price: 24.99,
			quantity: 1,
			rating: 3.5,
			totalAmount: 24.99,
		},
	],
	customer: {
		id: 'C001',
		name: 'Joseph Parker',
		email: 'josephparker@gmail.com',
		phone: '+(256) 245451 451',
		avatar: '/images/avatars/joseph.jpg',
	},
	billingAddress: {
		name: 'Joseph Parker',
		phone: '+(256) 245451 451',
		street: '2188 Joyce Street Rocky Mount',
		city: 'New York',
		state: 'NY',
		zipCode: '25645',
		country: 'United States',
	},
	shippingAddress: {
		name: 'Joseph Parker',
		phone: '+(256) 245451 451',
		street: '2188 Joyce Street Rocky Mount',
		city: 'California',
		state: 'CA',
		zipCode: '24567',
		country: 'United States',
	},
	paymentDetails: {
		transactionId: '#VL2T2446R0278124',
		method: 'credit_card',
		cardHolderName: 'Joseph Parker',
		cardNumber: '**** **** **** 2456',
		totalAmount: 415.96,
	},
	statusHistory: [
		{
			status: 'Order Placed',
			date: new Date('2021-12-15T05:34:00'),
			description: 'An order has been placed.',
			details: 'Seller has processed your order.',
		},
		{
			status: 'Packed',
			date: new Date('2021-12-16T05:40:00'),
			description: 'Your item has been picked up by courier partner',
		},
		{
			status: 'Shipping',
			date: new Date('2021-12-16T08:54:00'),
			description: 'RQK Logistics - MFDS1400457854\nYour item has been shipped.',
		},
		{
			status: 'Out For Delivery',
			date: new Date(),
			description: '',
		},
		{
			status: 'Delivered',
			date: new Date(),
			description: '',
		},
	],
	subtotal: 359.96,
	discount: 53.99,
	shippingCharge: 65.0,
	estimatedTax: 44.99,
	total: 415.96,
	trackingNumber: 'MFDS1400457854',
	logistics: {
		company: 'RQK Logistics',
		trackingId: 'MFDS1400457854',
	},
};

export function OrderDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

	useEffect(() => {
		const loadOrderDetail = async () => {
			if (!id) {
				navigate('/orders');
				return;
			}

			try {
				setLoading(true);
				// 模拟 API 延迟
				await new Promise(resolve => setTimeout(resolve, 500));

				// 模拟获取订单详情
				setOrderDetail(mockOrderDetail);
			} catch (error) {
				console.error('Failed to load order detail:', error);
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

		loadOrderDetail();
	}, [id, navigate, t]);

	const handleBack = () => {
		navigate('/orders');
	};

	const handleViewProfile = () => {
		console.log('View customer profile');
	};

	if (loading) {
		return (
			<Center h={400}>
				<Stack align="center" gap="md">
					<Loader size="lg" />
					<Text c="dimmed">{t('common.loading')}</Text>
				</Stack>
			</Center>
		);
	}

	if (!orderDetail) {
		return (
			<Center h={400}>
				<Text c="dimmed">{t('orders.order_not_found')}</Text>
			</Center>
		);
	}

	return (
		<Stack gap="lg" className={classes.orderDetailContainer}>
			{/* Header */}
			<Group justify="space-between">
				<Group>
					<Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={handleBack}>
						{t('common.back')}
					</Button>
					<Text size="xl" fw={700}>
						{t('orders.order')} #{orderDetail.orderNumber}
					</Text>
					<Badge variant="light" color="blue">
						{t('orders.invoice')}
					</Badge>
					<Badge variant="light" color="gray">
						{t('orders.logistics_details')}
					</Badge>
				</Group>
			</Group>

			<Grid gutter="lg">
				{/* 左侧列 - 产品信息和订单状态 */}
				<Grid.Col span={{ base: 12, md: 8 }}>
					<Stack gap="lg">
						{/* 产品详情 */}
						<OrderProductsCard
							items={orderDetail.items}
							subtotal={orderDetail.subtotal}
							discount={orderDetail.discount}
							shippingCharge={orderDetail.shippingCharge}
							estimatedTax={orderDetail.estimatedTax}
							total={orderDetail.total}
						/>

						{/* 订单状态 */}
						<OrderStatusCard statusHistory={orderDetail.statusHistory} currentStatusIndex={2} />
					</Stack>
				</Grid.Col>

				{/* 右侧列 - 配送状态、顾客信息、地址、支付详情 */}
				<Grid.Col span={{ base: 12, md: 4 }}>
					<Stack gap="lg">
						{/* 配送状态 */}
						{orderDetail.logistics && (
							<LogisticsCard
								company={orderDetail.logistics.company}
								trackingId={orderDetail.logistics.trackingId}
								paymentMode={t('orders.debit_card')}
							/>
						)}

						{/* 顾客详情 */}
						<CustomerCard customer={orderDetail.customer} onViewProfile={handleViewProfile} />

						{/* 账单地址 */}
						<AddressCard address={orderDetail.billingAddress} title={t('orders.billing_address')} />

						{/* 配送地址 */}
						<AddressCard address={orderDetail.shippingAddress} title={t('orders.shipping_address')} />

						{/* 支付详情 */}
						<PaymentCard paymentDetails={orderDetail.paymentDetails} />
					</Stack>
				</Grid.Col>
			</Grid>
		</Stack>
	);
}

export default OrderDetail;
