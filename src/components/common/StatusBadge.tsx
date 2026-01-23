/**
 * StatusBadge - 通用状态徽章组件
 */

import { Badge } from '@mantine/core';

interface StatusConfig {
	color: string;
	label: string;
}

interface StatusBadgeProps {
	status: number | string;
	statusMap: Record<string | number, StatusConfig>;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	variant?: 'light' | 'filled' | 'outline' | 'dot' | 'transparent';
}

export function StatusBadge({ 
	status, 
	statusMap, 
	size = 'sm', 
	variant = 'light' 
}: StatusBadgeProps) {
	const statusConfig = statusMap[status];
	
	if (!statusConfig) {
		return (
			<Badge variant={variant} color="gray" size={size}>
				Unknown
			</Badge>
		);
	}

	return (
		<Badge variant={variant} color={statusConfig.color} size={size}>
			{statusConfig.label}
		</Badge>
	);
}