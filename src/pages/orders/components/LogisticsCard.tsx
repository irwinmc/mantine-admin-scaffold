/**
 * LogisticsCard - 物流信息卡片
 */

import { Stack, Text } from '@mantine/core';
import { IconTruck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';

interface LogisticsCardProps {
	company: string;
	trackingId: string;
	paymentMode?: string;
}

export function LogisticsCard({ company, trackingId, paymentMode = 'Debit Card' }: LogisticsCardProps) {
	const { t } = useTranslation();

	return (
		<SectionCard title={company}>
			<Stack gap="md" align="center">
				<IconTruck size={48} color="var(--mantine-color-blue-6)" />
				<Text size="sm" c="dimmed">
					ID: {trackingId}
				</Text>
				<Text size="sm" c="dimmed">
					{t('orders.payment_mode')}: {paymentMode}
				</Text>
			</Stack>
		</SectionCard>
	);
}
