/**
 * StatusBadge - 分类状态徽章组件
 */

import { Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { CATEGORY_STATUS_MAP } from '../constants';
import { CategoryStatus } from '../types';

interface StatusBadgeProps {
	status: number;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const { t } = useTranslation();
	const statusConfig = CATEGORY_STATUS_MAP[status as CategoryStatus];

	return (
		<Badge variant="light" color={statusConfig.color} size="sm">
			{t(`categories.status_${status === CategoryStatus.ACTIVE ? 'active' : 'inactive'}`)}
		</Badge>
	);
}