import { Stack, Group, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import type { CategoryData } from '../types';

interface SalesChartProps {
	data: CategoryData[];
}

export function SalesChart({ data }: SalesChartProps) {
	const { t } = useTranslation();

	return (
		<SectionCard title={t('dashboard.sales_by_category')}>
			<Stack gap="lg" h="100%" justify="space-between">
				<Stack align="center" style={{ flex: 1 }} justify="center">
					<DonutChart
						h={240}
						data={data}
						size={200}
						thickness={50}
						withLabelsLine
						withLabels
						labelsType="percent"
						paddingAngle={2}
						strokeWidth={1}
					/>
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
		</SectionCard>
	);
}
