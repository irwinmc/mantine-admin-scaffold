import { Stack, Group, Text, useMantineColorScheme } from '@mantine/core';
import { PieChart, Pie, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import { chartTheme, chartColors } from './chartTheme';
import type { CategoryData } from '../types';

interface SalesChartProps {
	data: CategoryData[];
}

export function SalesChart({ data }: SalesChartProps) {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	// 给每条数据加上 fill 颜色，recharts 3.x 自动读取
	const chartData = data.map((item, index) => ({
		...item,
		fill: chartColors.pie[index % chartColors.pie.length],
	}));

	return (
		<SectionCard title={t('dashboard.sales_by_category')}>
			<Stack gap="lg" h="100%" justify="space-between">
				<Stack align="center" style={{ flex: 1 }} justify="center">
					<PieChart style={{ width: '100%', height: 240 }} responsive>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={100}
							innerRadius={50}
							paddingAngle={2}
							stroke="none"
							strokeWidth={0}
						/>
						<Tooltip contentStyle={chartTheme.tooltipContent(isDark)} />
					</PieChart>
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
