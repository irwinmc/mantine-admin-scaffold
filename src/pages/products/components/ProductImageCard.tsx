/**
 * ProductImageCard - 产品图片管理卡片组件
 * 显示已上传的图片列表，支持删除和添加新图片
 */

import { useState } from 'react';
import { Stack, Group, Image, ActionIcon, Box, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ProductImageDropzone } from './ProductImageDropzone';

interface ProductImageCardProps {
	images: string[];
	onChange: (images: string[]) => void;
	maxSize?: number;
}

export function ProductImageCard({ images, onChange, maxSize = 5 * 1024 * 1024 }: ProductImageCardProps) {
	const { t } = useTranslation();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleDelete = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		onChange(newImages);
	};

	const handleDrop = (files: File[]) => {
		// 在实际应用中，这里应该上传文件到服务器并获取URL
		// 现在我们模拟添加图片URL
		const newImageUrls = files.map(file => URL.createObjectURL(file));
		onChange([...images, ...newImageUrls]);

		console.log('Files to upload:', files);
		// TODO: 实现实际的文件上传逻辑
		// const uploadedUrls = await uploadFiles(files);
		// onChange([...images, ...uploadedUrls]);
	};

	return (
		<Stack gap="md">
			{/* 已上传的图片列表 */}
			{images.length > 0 && (
				<Box>
					<Text size="sm" fw={500} mb="xs">
						{t('product_edit.uploaded_images')} ({images.length})
					</Text>
					<Group gap="md">
						{images.map((image, index) => (
							<Box
								key={index}
								style={{ position: 'relative', width: 120, height: 120 }}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<Image
									src={image}
									alt={`Product ${index + 1}`}
									w={120}
									h={120}
									fit="cover"
									radius="md"
								/>
								{/* 删除按钮 */}
								<ActionIcon
									color="red"
									size="sm"
									radius="xl"
									variant="filled"
									style={{
										position: 'absolute',
										top: 4,
										right: 4,
										opacity: hoveredIndex === index ? 1 : 0.7,
										transition: 'opacity 0.2s',
										boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
									}}
									onClick={() => handleDelete(index)}
								>
									<IconX size={14} />
								</ActionIcon>
								{/* 主图标签 */}
								{index === 0 && (
									<Box
										style={{
											position: 'absolute',
											bottom: 0,
											left: 0,
											right: 0,
											backgroundColor: 'rgba(0, 0, 0, 0.7)',
											color: 'white',
											padding: '4px 8px',
											fontSize: '11px',
											textAlign: 'center',
											borderBottomLeftRadius: 'var(--mantine-radius-md)',
											borderBottomRightRadius: 'var(--mantine-radius-md)',
										}}
									>
										{t('product_edit.main_image')}
									</Box>
								)}
							</Box>
						))}
					</Group>
				</Box>
			)}

			{/* 上传新图片 */}
			<Box>
				<Text size="sm" fw={500} mb="xs">
					{images.length === 0 ? t('product_edit.upload_images') : t('product_edit.add_more_images')}
				</Text>
				<ProductImageDropzone onDrop={handleDrop} maxSize={maxSize} />
			</Box>
		</Stack>
	);
}
