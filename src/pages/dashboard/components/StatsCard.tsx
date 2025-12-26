import { Card, Text, Group, ThemeIcon } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { StatsCardData } from '../types';

export function StatsCard({ title, value, diff, icon: Icon, color }: StatsCardData) {
	const { t } = useTranslation();
	const isPositive = diff > 0;

	return (
		<Card padding="lg" radius="md" withBorder>
			<Group justify="space-between">
				<div>
					<Text c="dimmed" size="sm" fw={500}>
						{title}
					</Text>
					<Text size="xl" fw={700} mt="xs">
						{value}
					</Text>
					<Group gap="xs" mt="sm">
						<ThemeIcon color={isPositive ? 'teal' : 'red'} variant="light" size="sm" radius="xl">
							{isPositive ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
						</ThemeIcon>
						<Text c={isPositive ? 'teal' : 'red'} size="sm" fw={500}>
							{Math.abs(diff)}%
						</Text>
						<Text c="dimmed" size="sm">
							{t('dashboard.vs_last_month')}
						</Text>
					</Group>
				</div>
				<ThemeIcon color={color} size={60} radius="md" variant="light">
					<Icon size={32} stroke={1.5} />
				</ThemeIcon>
			</Group>
		</Card>
	);
}
