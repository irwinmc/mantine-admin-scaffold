import { Card, Text, Group, Badge, Stack } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import type { RevenueData } from '../types';

interface RevenueChartProps {
	data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
	const { t } = useTranslation();

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
			<Stack gap="md" h="100%" justify="space-between">
				<Group justify="space-between">
					<Text size="lg" fw={600}>
						{t('dashboard.revenue_overview')}
					</Text>
					<Badge variant="light" color="blue">
						{t('dashboard.last_7_months')}
					</Badge>
				</Group>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart
						data={data}
						dataKey="month"
						series={[
							{ name: 'revenue', label: t('dashboard.revenue'), color: 'blue.6' },
							{ name: 'orders', label: t('dashboard.orders'), color: 'cyan.6' },
						]}
						curveType="natural"
						withLegend
						gridAxis="xy"
						tickLine="xy"
					/>
				</ResponsiveContainer>
			</Stack>
		</Card>
	);
}
