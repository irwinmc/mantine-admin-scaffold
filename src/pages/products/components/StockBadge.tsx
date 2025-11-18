/**
 * StockBadge - 统一的库存状态徽章组件
 */

import { Badge } from '@mantine/core';

interface StockBadgeProps {
	stock: number;
	label: {
		outOfStock: string;
		lowStock: string;
		inStock: string;
	};
}

export function StockBadge({ stock, label }: StockBadgeProps) {
	if (stock === 0) {
		return (
			<Badge variant="light" color="red">
				{label.outOfStock}
			</Badge>
		);
	}

	if (stock < 30) {
		return (
			<Badge variant="light" color="orange">
				{label.lowStock}
			</Badge>
		);
	}

	return (
		<Badge variant="light" color="green">
			{label.inStock}
		</Badge>
	);
}

