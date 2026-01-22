/**
 * AddressCard - 地址信息卡片
 */

import { Card, Stack, Text, Group } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import type { Address } from '../types';

interface AddressCardProps {
	address: Address;
	title: string;
}

export function AddressCard({ address, title }: AddressCardProps) {
	return (
		<Card padding="lg" radius="md" withBorder>
			<Stack gap="md">
				<Group gap="xs">
					<IconMapPin size={20} />
					<Text size="lg" fw={600}>
						{title}
					</Text>
				</Group>

				<Stack gap="xs">
					<Text fw={500}>{address.name}</Text>
					<Text size="sm">{address.phone}</Text>
					<Text size="sm">{address.street}</Text>
					<Text size="sm">
						{address.city} - {address.zipCode}
					</Text>
					<Text size="sm">{address.country}</Text>
				</Stack>
			</Stack>
		</Card>
	);
}
