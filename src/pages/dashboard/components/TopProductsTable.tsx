import { Card, Text, Stack, Table, Group, ThemeIcon } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import type { TopProduct } from '../types';

interface TopProductsTableProps {
	data: TopProduct[];
}

export function TopProductsTable({ data }: TopProductsTableProps) {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
			<Stack gap="md" h="100%">
				<Text size="lg" fw={600}>
					Top Products
				</Text>
				<Table striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Product</Table.Th>
							<Table.Th>Sales</Table.Th>
							<Table.Th>Revenue</Table.Th>
							<Table.Th>Trend</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data.map(product => (
							<Table.Tr key={product.name}>
								<Table.Td>{product.name}</Table.Td>
								<Table.Td>{product.sales}</Table.Td>
								<Table.Td>{product.revenue}</Table.Td>
								<Table.Td>
									<Group gap="xs">
										<ThemeIcon
											color={product.trend > 0 ? 'teal' : 'red'}
											variant="light"
											size="sm"
											radius="xl"
										>
											{product.trend > 0 ? (
												<IconArrowUpRight size={16} />
											) : (
												<IconArrowDownRight size={16} />
											)}
										</ThemeIcon>
										<Text c={product.trend > 0 ? 'teal' : 'red'} size="sm" fw={500}>
											{Math.abs(product.trend)}%
										</Text>
									</Group>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Stack>
		</Card>
	);
}

