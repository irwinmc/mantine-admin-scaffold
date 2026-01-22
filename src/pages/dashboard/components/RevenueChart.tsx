import { Badge } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import type { RevenueData } from '../types';

interface RevenueChartProps {
	data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
	const { t } = useTranslation();

	const rightSection = (
		<Badge variant="light" color="blue">
			{t('dashboard.last_7_months')}
		</Badge>
	);

	return (
		<SectionCard title={t('dashboard.revenue_overview')} rightSection={rightSection}>
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
		</SectionCard>
	);
}
