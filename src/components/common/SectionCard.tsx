/**
 * SectionCard - 带标题的卡片组件
 * 用于统一显示带有标题和内容的卡片布局
 */

import type { ReactNode } from 'react';
import { Card, Box, Text } from '@mantine/core';
import classes from './SectionCard.module.css';

interface SectionCardProps {
	title: string;
	children: ReactNode;
	rightSection?: ReactNode;
}

export function SectionCard({ title, children, rightSection }: SectionCardProps) {
	return (
		<Card radius="md" withBorder padding={0} className={classes.card}>
			{/* Card Header */}
			<Box p="md" className={classes.header}>
				<Text size="md" fw={600} className={classes.title}>
					{title}
				</Text>
				{rightSection && (
					<Box className={classes.rightSection}>
						{rightSection}
					</Box>
				)}
			</Box>

			{/* Card Content */}
			<Box p="lg" className={classes.content}>
				{children}
			</Box>
		</Card>
	);
}
