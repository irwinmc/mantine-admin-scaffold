/**
 * OrderProductsCard - 订单产品信息卡片
 */

import { Stack, Text, Table, Group, Image, Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';
import type { OrderItem } from '../types';

interface OrderProductsCardProps {
	items: OrderItem[];
	subtotal: number;
	discount: number;
	shippingCharge: number;
	estimatedTax: number;
	total: number;
}

export function OrderProductsCard({
	items,
	subtotal,
	discount,
	shippingCharge,
	estimatedTax,
	total,
}: OrderProductsCardProps) {
	const { t } = useTranslation();

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Text key={i} c={i < rating ? 'yellow' : 'gray'} span>
				★
			</Text>
		));
	};

	return (
		<SectionCard title={t('orders.product_details')}>
			<Table withRowBorders={false} horizontalSpacing="md" verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>{t('orders.product_details')}</Table.Th>
						<Table.Th>{t('orders.item_price')}</Table.Th>
						<Table.Th>{t('orders.quantity')}</Table.Th>
						<Table.Th>{t('orders.rating')}</Table.Th>
						<Table.Th>{t('orders.total_amount')}</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{items.map(item => (
						<Table.Tr key={item.id}>
							<Table.Td>
								<Group gap="md">
									<Image src={item.productImage} alt={item.productName} w={60} h={60} radius="md" />
									<Stack gap={4}>
										<Text fw={500}>{item.productName}</Text>
										<Group gap="xs">
											{item.color && (
												<Text size="sm" c="dimmed">
													{t('orders.color')}: {item.color}
												</Text>
											)}
											{item.size && (
												<Text size="sm" c="dimmed">
													{t('orders.size')}: {item.size}
												</Text>
											)}
										</Group>
									</Stack>
								</Group>
							</Table.Td>
							<Table.Td>
								<Text fw={500}>${item.price}</Text>
							</Table.Td>
							<Table.Td>
								<Text>{item.quantity.toString().padStart(2, '0')}</Text>
							</Table.Td>
							<Table.Td>{item.rating && <Group gap={2}>{renderStars(item.rating)}</Group>}</Table.Td>
							<Table.Td>
								<Text fw={600}>${item.totalAmount}</Text>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			<Divider variant="dashed" />

			<SectionCard.Body>
				<Stack gap="xs">
					<Group justify="space-between">
						<Text size="sm">{t('orders.sub_total')}:</Text>
						<Text size="sm">${subtotal}</Text>
					</Group>
					<Group justify="space-between">
						<Text size="sm">{t('orders.discount')}</Text>
						<Text size="sm" c="red">
							-${discount}
						</Text>
					</Group>
					<Group justify="space-between">
						<Text size="sm">{t('orders.shipping_charge')}:</Text>
						<Text size="sm">${shippingCharge}</Text>
					</Group>
					<Group justify="space-between">
						<Text size="sm">{t('orders.estimated_tax')}:</Text>
						<Text size="sm">${estimatedTax}</Text>
					</Group>
					<Divider />
					<Group justify="space-between">
						<Text fw={600}>{t('orders.total')} (USD):</Text>
						<Text fw={600}>${total}</Text>
					</Group>
				</Stack>
			</SectionCard.Body>
		</SectionCard>
	);
}
