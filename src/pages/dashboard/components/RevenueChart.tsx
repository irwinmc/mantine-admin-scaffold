import { Card, Text, Group, Badge, Stack } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';
import type { RevenueData } from '../types';

interface RevenueChartProps {
	data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
			<Stack gap="md" h="100%" justify="space-between">
				<Group justify="space-between">
					<Text size="lg" fw={600}>
						Revenue Overview
					</Text>
					<Badge variant="light" color="blue">
						Last 7 months
					</Badge>
				</Group>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart
						data={data}
						dataKey="month"
						series={[
							{ name: 'revenue', label: 'Revenue', color: 'blue.6' },
							{ name: 'orders', label: 'Orders', color: 'cyan.6' },
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

