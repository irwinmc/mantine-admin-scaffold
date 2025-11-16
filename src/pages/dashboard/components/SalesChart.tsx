import { Card, Text, Stack, Group } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import type { CategoryData } from '../types';

interface SalesChartProps {
	data: CategoryData[];
}

export function SalesChart({ data }: SalesChartProps) {
	const { t } = useTranslation();

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
			<Stack gap="lg" h="100%" justify="space-between">
				<Text size="lg" fw={600}>
					{t('dashboard.sales_by_category')}
				</Text>
				<Stack align="center" style={{ flex: 1 }} justify="center">
					<ResponsiveContainer width="100%" height={240}>
						<DonutChart
							data={data}
							size={200}
							thickness={50}
							withLabelsLine
							withLabels
							labelsType="percent"
							paddingAngle={2}
							strokeWidth={1}
						/>
					</ResponsiveContainer>
				</Stack>
				<Group gap="md" justify="center" wrap="wrap">
					{data.map(item => (
						<Group key={item.name} gap={6} wrap="nowrap">
							<div
								style={{
									width: 12,
									height: 12,
									borderRadius: '50%',
									backgroundColor: item.hexColor,
									flexShrink: 0,
								}}
							/>
							<Text size="sm" fw={500} style={{ whiteSpace: 'nowrap' }}>
								{item.name}
							</Text>
						</Group>
					))}
				</Group>
			</Stack>
		</Card>
	);
}
