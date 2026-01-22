/**
 * OrderStatusCard - 订单状态卡片
 */

import { Text, Group, Button, Timeline } from '@mantine/core';
import { IconCheck, IconClockHour4 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';
import type { OrderStatusHistory } from '../types';

interface OrderStatusCardProps {
	statusHistory: OrderStatusHistory[];
	currentStatusIndex?: number;
}

export function OrderStatusCard({ statusHistory, currentStatusIndex = 2 }: OrderStatusCardProps) {
	const { t } = useTranslation();

	const rightSection = (
		<Group gap="xs">
			<Button variant="light" size="xs">
				{t('orders.change_address')}
			</Button>
			<Button variant="light" color="red" size="xs">
				{t('orders.cancel_order')}
			</Button>
		</Group>
	);

	return (
		<SectionCard title={t('orders.order_status')} rightSection={rightSection}>
			<SectionCard.Body>
				<Timeline
					active={currentStatusIndex}
					bulletSize={24}
					lineWidth={2}
					styles={{
						itemTitle: {
							lineHeight: '24px',
							marginTop: 0,
						},
					}}
				>
					{statusHistory.map((status, index) => (
						<Timeline.Item
							key={index}
							bullet={
								index <= currentStatusIndex ? <IconCheck size={12} /> : <IconClockHour4 size={12} />
							}
							title={status.status}
							color={index <= currentStatusIndex ? 'green' : 'gray'}
						>
							{status.description && (
								<Text c="dimmed" size="sm">
									{status.description}
								</Text>
							)}
							{status.date && (
								<Text size="xs" mt={4}>
									{status.date.toLocaleString()}
								</Text>
							)}
						</Timeline.Item>
					))}
				</Timeline>
			</SectionCard.Body>
		</SectionCard>
	);
}
