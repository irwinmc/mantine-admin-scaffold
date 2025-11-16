import { useState } from 'react';
import { Card, Text, Stack, Grid, Title, SegmentedControl, Group } from '@mantine/core';
import { LineChart, BarChart, PieChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';

export function Analytics() {
	const [period, setPeriod] = useState('7d');
	const [chartType, setChartType] = useState('line');

	const trafficData = [
		{ date: 'Mon', visitors: 4000, pageViews: 8000, bounceRate: 45 },
		{ date: 'Tue', visitors: 3000, pageViews: 6500, bounceRate: 42 },
		{ date: 'Wed', visitors: 5000, pageViews: 10000, bounceRate: 38 },
		{ date: 'Thu', visitors: 4500, pageViews: 9000, bounceRate: 40 },
		{ date: 'Fri', visitors: 6000, pageViews: 12000, bounceRate: 35 },
		{ date: 'Sat', visitors: 5500, pageViews: 11000, bounceRate: 37 },
		{ date: 'Sun', visitors: 4800, pageViews: 9500, bounceRate: 39 },
	];

	const deviceData = [
		{ name: 'Desktop', device: 'Desktop', value: 4500, color: 'blue.6' },
		{ name: 'Mobile', device: 'Mobile', value: 3200, color: 'cyan.6' },
		{ name: 'Tablet', device: 'Tablet', value: 1800, color: 'violet.6' },
	];

	const conversionData = [
		{ stage: 'Visits', count: 10000 },
		{ stage: 'Product View', count: 6500 },
		{ stage: 'Add to Cart', count: 3200 },
		{ stage: 'Checkout', count: 1800 },
		{ stage: 'Purchase', count: 1200 },
	];

	return (
		<Stack gap="lg">
			<Group justify="space-between" align="center">
				<Title order={2}>Analytics</Title>
				<Group>
					<SegmentedControl
						value={period}
						onChange={setPeriod}
						data={[
							{ label: '7D', value: '7d' },
							{ label: '30D', value: '30d' },
							{ label: '90D', value: '90d' },
							{ label: '1Y', value: '1y' },
						]}
					/>
				</Group>
			</Group>

			<Grid gutter="lg">
				<Grid.Col span={{ base: 12, lg: 8 }}>
					<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
						<Stack gap="md" h="100%" justify="space-between">
							<Group justify="space-between">
								<Text size="lg" fw={600}>
									Website Traffic
								</Text>
								<SegmentedControl
									value={chartType}
									onChange={setChartType}
									data={[
										{ label: 'Line', value: 'line' },
										{ label: 'Bar', value: 'bar' },
									]}
								/>
							</Group>
							<ResponsiveContainer width="100%" height={350}>
								{chartType === 'line' ? (
									<LineChart
										h={350}
										data={trafficData}
										dataKey="date"
										series={[
											{ name: 'visitors', label: 'Visitors', color: 'blue.6' },
											{
												name: 'pageViews',
												label: 'Page Views',
												color: 'cyan.6',
											},
										]}
										curveType="monotone"
										withLegend
										gridAxis="xy"
										tickLine="xy"
									/>
								) : (
									<BarChart
										h={350}
										data={trafficData}
										dataKey="date"
										series={[
											{ name: 'visitors', label: 'Visitors', color: 'blue.6' },
											{
												name: 'pageViews',
												label: 'Page Views',
												color: 'cyan.6',
											},
										]}
										withLegend
										gridAxis="xy"
										tickLine="xy"
									/>
								)}
							</ResponsiveContainer>
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 4 }}>
					<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
						<Stack gap="md" h="100%" justify="space-between">
							<Text size="lg" fw={600}>
								Device Distribution
							</Text>
							<ResponsiveContainer width="100%" height={280}>
								<PieChart
									data={deviceData}
									size={220}
									withLabelsLine
									labelsPosition="outside"
									labelsType="percent"
									withTooltip
									paddingAngle={0}
								/>
							</ResponsiveContainer>
							<Stack gap="xs">
								{deviceData.map(item => (
									<Group key={item.device} justify="space-between">
										<Group gap="xs">
											<div
												style={{
													width: 12,
													height: 12,
													borderRadius: 2,
													backgroundColor: item.color,
												}}
											/>
											<Text size="sm">{item.device}</Text>
										</Group>
										<Text size="sm" fw={600}>
											{item.value.toLocaleString()}
										</Text>
									</Group>
								))}
							</Stack>
						</Stack>
					</Card>
				</Grid.Col>
			</Grid>

			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Stack gap="md">
					<Text size="lg" fw={600}>
						Conversion Funnel
					</Text>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							h={300}
							data={conversionData}
							dataKey="stage"
							series={[{ name: 'count', label: 'Users', color: 'violet.6' }]}
							withLegend
							gridAxis="y"
							tickLine="y"
							orientation="vertical"
						/>
					</ResponsiveContainer>
				</Stack>
			</Card>
		</Stack>
	);
}
