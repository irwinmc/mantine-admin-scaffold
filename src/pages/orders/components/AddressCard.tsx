/**
 * AddressCard - 地址信息卡片
 */

import { Stack, Text } from '@mantine/core';
import { SectionCard } from '@/components/common/SectionCard';
import type { Address } from '../types';

interface AddressCardProps {
	address: Address;
	title: string;
}

export function AddressCard({ address, title }: AddressCardProps) {
	return (
		<SectionCard title={title}>
			<SectionCard.Body>
				<Stack gap="xs">
					<Text fw={500}>{address.name}</Text>
					<Text size="sm">{address.phone}</Text>
					<Text size="sm">{address.street}</Text>
					<Text size="sm">
						{address.city} - {address.zipCode}
					</Text>
					<Text size="sm">{address.country}</Text>
				</Stack>
			</SectionCard.Body>
		</SectionCard>
	);
}
