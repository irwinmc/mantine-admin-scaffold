/**
 * Dashboard 主页面
 * Feature-Based 架构示例
 */

import { SimpleGrid, Stack, Grid, Title, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { StatsCard, RevenueChart, SalesChart, TopProductsTable, RecentOrdersTable } from './components';
import { statsData, revenueData, categoryData, topProducts, recentOrders } from './data/mockData';

export function Dashboard() {
	const { t } = useTranslation();

	return (
		<Stack gap="lg">
			<Group justify="space-between" align="center" ml="md">
				<Title order={2}>{t('nav.dashboard')}</Title>
			</Group>

			{/* 统计卡片 */}
			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
				{statsData.map(stat => (
					<StatsCard key={stat.title} {...stat} title={t(stat.title)} />
				))}
			</SimpleGrid>

			{/* 图表区域 */}
			<Grid>
				<Grid.Col span={{ base: 12, lg: 8 }}>
					<RevenueChart data={revenueData} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, lg: 4 }}>
					<SalesChart data={categoryData} />
				</Grid.Col>
			</Grid>

			{/* 表格区域 */}
			<Grid>
				<Grid.Col span={{ base: 12, lg: 6 }}>
					<TopProductsTable data={topProducts} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, lg: 6 }}>
					<RecentOrdersTable data={recentOrders} />
				</Grid.Col>
			</Grid>
		</Stack>
	);
}

// 默认导出
export default Dashboard;
