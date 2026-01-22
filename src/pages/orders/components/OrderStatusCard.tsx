import { Card, Stack, Text, Group, Button, Timeline } from '@mantine/core';
import { IconCheck, IconClockHour4 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { OrderStatusHistory } from '../types';

interface OrderStatusCardProps {
	statusHistory: OrderStatusHistory[];
	currentStatusIndex?: number;
}

export function OrderStatusCard({ statusHistory, currentStatusIndex = 2 }: OrderStatusCardProps) {
	const { t } = useTranslation();

	return (
		<Card padding="lg" radius="md" withBorder>
			<Stack gap="md">
				<Group justify="space-between">
					<Text size="lg" fw={600}>
						{t('orders.order_status')}
					</Text>
					<Group gap="xs">
						<Button variant="light" size="xs">
							{t('orders.change_address')}
						</Button>
						<Button variant="light" color="red" size="xs">
							{t('orders.cancel_order')}
						</Button>
					</Group>
				</Group>

				<Timeline active={currentStatusIndex} bulletSize={24} lineWidth={2}>
					{statusHistory.map((status, index) => (
						<Timeline.Item
							key={index}
							bullet={
								index <= currentStatusIndex ? <IconCheck size={12} /> : <IconClockHour4 size={12} />
							}
							title={status.status}
							color={index <= currentStatusIndex ? 'green' : 'gray'}
						>
							<Text c="dimmed" size="sm">
								{status.description}
							</Text>
							{status.details && (
								<Text c="dimmed" size="xs" mt={4}>
									{status.details}
								</Text>
							)}
							<Text size="xs" mt={4}>
								{status.date.toLocaleString()}
							</Text>
						</Timeline.Item>
					))}
				</Timeline>
			</Stack>
		</Card>
	);
}
