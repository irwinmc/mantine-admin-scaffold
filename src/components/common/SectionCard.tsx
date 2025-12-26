/**
 * SectionCard - 带标题的卡片组件
 * 用于统一显示带有标题和内容的卡片布局
 */

import type { ReactNode } from 'react';
import { Card, Box, Text, useMantineColorScheme } from '@mantine/core';

interface SectionCardProps {
	title: string;
	children: ReactNode;
	rightSection?: ReactNode;
}

export function SectionCard({ title, children, rightSection }: SectionCardProps) {
	const { colorScheme } = useMantineColorScheme();

	const headerBg = colorScheme === 'dark' ? 'dark.6' : 'gray.1';
	const borderColor = colorScheme === 'dark' ? 'dark.4' : 'gray.3';
	const textColor = colorScheme === 'dark' ? 'gray.3' : 'gray.8';
	const contentBg = colorScheme === 'dark' ? 'dark.7' : 'white';

	return (
		<Card radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
			{/* Card Header */}
			<Box
				p="md"
				bg={headerBg}
				style={{
					position: 'relative',
					borderBottom: `1px solid var(--mantine-color-${borderColor})`,
				}}
			>
				<Text size="md" fw={600} c={textColor}>
					{title}
				</Text>
				{rightSection && (
					<Box
						style={{
							position: 'absolute',
							right: 'var(--mantine-spacing-md)',
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						{rightSection}
					</Box>
				)}
			</Box>

			{/* Card Content */}
			<Box p="lg" bg={contentBg}>
				{children}
			</Box>
		</Card>
	);
}
