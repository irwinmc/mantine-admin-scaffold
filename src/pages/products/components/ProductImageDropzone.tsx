/**
 * ProductImageDropzone - 产品图片上传拖放组件
 */

import { useRef } from 'react';
import { Text, Group, Button, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, type FileWithPath } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface ProductImageDropzoneProps {
	onDrop?: (files: FileWithPath[]) => void;
	maxSize?: number; // in bytes
}

export function ProductImageDropzone({ onDrop, maxSize = 5 * 1024 * 1024 }: ProductImageDropzoneProps) {
	const { t } = useTranslation();
	const openRef = useRef<() => void>(null);

	const handleDrop = (files: FileWithPath[]) => {
		if (onDrop) {
			onDrop(files);
		}
	};

	return (
		<Dropzone
			openRef={openRef}
			onDrop={handleDrop}
			radius="md"
			accept={IMAGE_MIME_TYPE}
			maxSize={maxSize}
			onReject={files => {
				console.error('Rejected files:', files);
			}}
		>
			<div style={{ pointerEvents: 'none' }}>
				<Group justify="center">
					<Dropzone.Accept>
						<IconCloudUpload
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-blue-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-red-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhoto
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-dimmed)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Idle>
				</Group>

				<Text ta="center" fw={700} fz="lg" mt="xl">
					<Dropzone.Accept>{t('product_edit.dropzone_accept')}</Dropzone.Accept>
					<Dropzone.Reject>{t('product_edit.dropzone_reject')}</Dropzone.Reject>
					<Dropzone.Idle>{t('product_edit.dropzone_title')}</Dropzone.Idle>
				</Text>
				<Text ta="center" fz="sm" mt="xs" c="dimmed">
					{t('product_edit.dropzone_description', {
						size: (maxSize / 1024 / 1024).toFixed(0),
					})}
				</Text>

				<Group justify="center" mt="lg" style={{ pointerEvents: 'all' }}>
					<Button size="md" variant="default" onClick={() => openRef.current?.()}>
						{t('product_edit.select_files')}
					</Button>
				</Group>
			</div>
		</Dropzone>
	);
}
