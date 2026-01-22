/**
 * OrderDetail 页面 - 订单详情
 */

import { useParams } from 'react-router';
import { Stack, Grid, Text, Group, Button, Badge, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
	OrderProductsCard,
	OrderStatusCard,
	LogisticsCard,
	CustomerCard,
	AddressCard,
	PaymentCard,
} from './components';
import { useOrderDetail } from './hooks';
import classes from './OrderDetail.module.css';

export function OrderDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();

	const { orderDetail, loading } = useOrderDetail({ orderId: id });

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
