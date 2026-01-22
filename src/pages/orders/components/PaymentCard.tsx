import { Card, Stack, Text, Group, ActionIcon, Tooltip, CopyButton } from '@mantine/core';
import { IconCreditCard, IconCopy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { PaymentDetails } from '../types';

interface PaymentCardProps {
	paymentDetails: PaymentDetails;
}

export function PaymentCard({ paymentDetails }: PaymentCardProps) {
	const { t } = useTranslation();

	return (
		<Card padding="lg" radius="md" withBorder>
			<Stack gap="md">
				<Group gap="xs">
					<IconCreditCard size={20} />
					<Text size="lg" fw={600}>
						{t('orders.payment_details')}
					</Text>
				</Group>

				<Stack gap="xs">
					<Group justify="space-between">
						<Text size="sm">{t('orders.transactions')}:</Text>
						<Group gap="xs">
							<Text size="sm" fw={500}>
								{paymentDetails.transactionId}
							</Text>
							<CopyButton value={paymentDetails.transactionId}>
								{({ copied, copy }) => (
									<Tooltip label={copied ? t('common.copied') : t('common.copy')}>
										<ActionIcon
											color={copied ? 'teal' : 'gray'}
											variant="subtle"
											onClick={copy}
											size="sm"
										>
											<IconCopy size={12} />
										</ActionIcon>
									</Tooltip>
								)}
							</CopyButton>
						</Group>
					</Group>
					<Group justify="space-between">
						<Text size="sm">{t('orders.payment_method')}:</Text>
						<Text size="sm" fw={500}>
							{t('orders.debit_card')}
						</Text>
					</Group>
					{paymentDetails.cardHolderName && (
						<Group justify="space-between">
							<Text size="sm">{t('orders.card_holder_name')}:</Text>
							<Text size="sm" fw={500}>
								{paymentDetails.cardHolderName}
							</Text>
						</Group>
					)}
					{paymentDetails.cardNumber && (
						<Group justify="space-between">
							<Text size="sm">{t('orders.card_number')}:</Text>
							<Text size="sm" fw={500}>
								{paymentDetails.cardNumber}
							</Text>
						</Group>
					)}
					<Group justify="space-between">
						<Text size="sm">{t('orders.total_amount')}:</Text>
						<Text size="sm" fw={600}>
							${paymentDetails.totalAmount}
						</Text>
					</Group>
				</Stack>
			</Stack>
		</Card>
	);
}
