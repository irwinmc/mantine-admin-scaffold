import { Badge, useMantineColorScheme } from '@mantine/core';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '@/components';
import { chartTheme, chartColors } from './chartTheme';
import type { RevenueData } from '../types';

interface RevenueChartProps {
	data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const rightSection = (
		<Badge variant="light" color="blue">
			{t('dashboard.last_7_months')}
		</Badge>
	);

	return (
		<SectionCard title={t('dashboard.revenue_overview')} rightSection={rightSection}>
			<AreaChart
				style={{ width: '100%', height: 320 }}
				responsive
				data={data}
				margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={chartColors.revenue} stopOpacity={0.3} />
						<stop offset="95%" stopColor={chartColors.revenue} stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={chartColors.orders} stopOpacity={0.3} />
						<stop offset="95%" stopColor={chartColors.orders} stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid(isDark)} vertical horizontal />
				<XAxis
					dataKey="month"
					tick={{ fontSize: 12, fill: chartTheme.text }}
					axisLine={{ stroke: chartTheme.text }}
					tickLine={{ stroke: chartTheme.text }}
				/>
				<YAxis
					tick={{ fontSize: 12, fill: chartTheme.text }}
					axisLine={{ stroke: chartTheme.text }}
					tickLine={{ stroke: chartTheme.text }}
				/>
				<Tooltip contentStyle={chartTheme.tooltipContent(isDark)} />
				<Legend />
				<Area
					type="natural"
					dataKey="revenue"
					name={t('dashboard.revenue')}
					stroke={chartColors.revenue}
					fill="url(#colorRevenue)"
					strokeWidth={2}
				/>
				<Area
					type="natural"
					dataKey="orders"
					name={t('dashboard.orders')}
					stroke={chartColors.orders}
					fill="url(#colorOrders)"
					strokeWidth={2}
				/>
			</AreaChart>
		</SectionCard>
	);
}
