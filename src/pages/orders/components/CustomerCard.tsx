/**
 * CustomerCard - 客户信息卡片
 */

import { Stack, Text, Group, Button, Avatar } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components/common/SectionCard';
import type { Customer } from '../types';

interface CustomerCardProps {
	customer: Customer;
	onViewProfile?: () => void;
}

export function CustomerCard({ customer, onViewProfile }: CustomerCardProps) {
	const { t } = useTranslation();

	const rightSection = (
		<Button variant="filled" size="xs" onClick={onViewProfile}>
			{t('orders.view_profile')}
		</Button>
	);

	return (
		<SectionCard title={t('orders.customer_details')} rightSection={rightSection}>
			<Stack gap="md">
				<Group>
					<Avatar src={customer.avatar} size="lg" radius="xl">
						{customer.name.charAt(0)}
					</Avatar>
					<Stack gap={4}>
						<Text fw={500}>{customer.name}</Text>
						<Text size="sm" c="dimmed">
							{t('orders.customer')}
						</Text>
					</Stack>
				</Group>

				<Stack gap="xs">
					<Group gap="xs">
						<IconMail size={16} />
						<Text size="sm">{customer.email}</Text>
					</Group>
					<Group gap="xs">
						<IconPhone size={16} />
						<Text size="sm">{customer.phone}</Text>
					</Group>
				</Stack>
			</Stack>
		</SectionCard>
	);
}
