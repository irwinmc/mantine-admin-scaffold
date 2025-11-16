import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
	Container,
	Paper,
	Title,
	TextInput,
	Textarea,
	NumberInput,
	Select,
	Button,
	Group,
	Stack,
	Grid,
	FileInput,
	Switch,
	Badge,
	Avatar,
	Box,
	Text,
	useMantineColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { IconUpload, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { z } from 'zod';

// Zod v4 验证 Schema
const productSchema = z.object({
	name: z.string().min(2, { error: '产品名称至少 2 个字符' }).max(100, { error: '产品名称不能超过 100 个字符' }),
	description: z.string().min(10, { error: '描述至少 10 个字符' }).max(500, { error: '描述不能超过 500 个字符' }),
	price: z.number().min(0.01, { error: '价格必须大于 0' }).max(999999, { error: '价格不能超过 999999' }),
	cost: z.number().min(0, { error: '成本不能为负数' }).max(999999, { error: '成本不能超过 999999' }),
	stock: z.number().int({ error: '库存必须是整数' }).min(0, { error: '库存不能为负数' }),
	sku: z.string().min(1, { error: 'SKU 不能为空' }),
	category: z.string().min(1, { error: '请选择分类' }),
	status: z.enum(['active', 'inactive', 'draft']),
	featured: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

// 模拟产品数据
const mockProduct = {
	id: 1,
	name: 'Wireless Headphones',
	description:
		'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
	price: 199.99,
	cost: 120.0,
	stock: 45,
	sku: 'WH-001',
	category: 'electronics',
	status: 'active' as const,
	featured: true,
	image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
};

export function ProductEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { colorScheme } = useMantineColorScheme();
	const isEditMode = !!id;

	const form = useForm<ProductFormValues>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			cost: 0,
			stock: 0,
			sku: '',
			category: '',
			status: 'draft',
			featured: false,
		},
		validate: zod4Resolver(productSchema),
	});

	// 加载产品数据（编辑模式）
	useEffect(() => {
		if (isEditMode) {
			// TODO: 从 API 加载产品数据
			// 这里使用模拟数据
			form.setValues({
				name: mockProduct.name,
				description: mockProduct.description,
				price: mockProduct.price,
				cost: mockProduct.cost,
				stock: mockProduct.stock,
				sku: mockProduct.sku,
				category: mockProduct.category,
				status: mockProduct.status,
				featured: mockProduct.featured,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditMode]);

	const handleSubmit = (values: ProductFormValues) => {
		console.log('Form values:', values);

		// TODO: 提交到 API
		notifications.show({
			title: isEditMode ? '更新成功' : '创建成功',
			message: isEditMode ? '产品信息已更新' : '新产品已创建',
			color: 'green',
		});

		// 返回产品列表
		navigate('/products');
	};

	const handleCancel = () => {
		navigate('/products');
	};

	const categoryOptions = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'food', label: 'Food' },
		{ value: 'books', label: 'Books' },
		{ value: 'toys', label: 'Toys' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'home', label: 'Home & Garden' },
		{ value: 'others', label: 'Others' },
	];

	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'inactive', label: 'Inactive' },
		{ value: 'draft', label: 'Draft' },
	];

	return (
		<Container size="lg">
			<Stack gap="lg">
				{/* Header */}
				<Group justify="space-between">
					<Group>
						<Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={handleCancel}>
							返回
						</Button>
						<Title order={2}>{isEditMode ? '编辑产品' : '添加产品'}</Title>
						{isEditMode && (
							<Badge variant="light" color="blue">
								ID: {id}
							</Badge>
						)}
					</Group>
				</Group>

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Grid gutter="lg">
						{/* 左侧 - 主要信息 */}
						<Grid.Col span={{ base: 12, md: 8 }}>
							<Stack gap="lg">
								{/* 基本信息 */}
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="md">
										<Text size="lg" fw={600}>
											基本信息
										</Text>

										<TextInput
											label="产品名称"
											placeholder="输入产品名称"
											withAsterisk
											key={form.key('name')}
											{...form.getInputProps('name')}
										/>

										<Textarea
											label="产品描述"
											placeholder="输入产品描述"
											withAsterisk
											minRows={4}
											maxRows={8}
											key={form.key('description')}
											{...form.getInputProps('description')}
										/>

										<TextInput
											label="SKU"
											placeholder="产品编号"
											withAsterisk
											key={form.key('sku')}
											{...form.getInputProps('sku')}
										/>
									</Stack>
								</Paper>

								{/* 价格和库存 */}
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="md">
										<Text size="lg" fw={600}>
											价格与库存
										</Text>

										<Grid>
											<Grid.Col span={6}>
												<NumberInput
													label="售价"
													placeholder="0.00"
													withAsterisk
													prefix="$"
													decimalScale={2}
													fixedDecimalScale
													min={0}
													key={form.key('price')}
													{...form.getInputProps('price')}
												/>
											</Grid.Col>
											<Grid.Col span={6}>
												<NumberInput
													label="成本价"
													placeholder="0.00"
													withAsterisk
													prefix="$"
													decimalScale={2}
													fixedDecimalScale
													min={0}
													key={form.key('cost')}
													{...form.getInputProps('cost')}
												/>
											</Grid.Col>
										</Grid>

										<NumberInput
											label="库存数量"
											placeholder="0"
											withAsterisk
											min={0}
											key={form.key('stock')}
											{...form.getInputProps('stock')}
										/>

										{/* 利润预估 */}
										{form.getValues().price > 0 && form.getValues().cost > 0 && (
											<Box
												p="sm"
												bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'}
												style={{ borderRadius: 8 }}
											>
												<Text size="sm" c="dimmed">
													预估利润：{' '}
													<Text component="span" fw={600} c="green">
														${(form.getValues().price - form.getValues().cost).toFixed(2)}
													</Text>{' '}
													(
													{(
														((form.getValues().price - form.getValues().cost) /
															form.getValues().price) *
														100
													).toFixed(1)}
													%)
												</Text>
											</Box>
										)}
									</Stack>
								</Paper>

								{/* 产品图片 */}
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="md">
										<Text size="lg" fw={600}>
											产品图片
										</Text>

										{isEditMode && mockProduct.image && (
											<Group>
												<Avatar src={mockProduct.image} size={80} radius="md" />
												<Text size="sm" c="dimmed">
													当前图片
												</Text>
											</Group>
										)}

										<FileInput
											label="上传图片"
											placeholder="选择图片文件"
											leftSection={<IconUpload size={16} />}
											accept="image/*"
											clearable
										/>

										<Text size="xs" c="dimmed">
											支持 JPG, PNG, WEBP 格式，最大 5MB
										</Text>
									</Stack>
								</Paper>
							</Stack>
						</Grid.Col>

						{/* 右侧 - 分类和设置 */}
						<Grid.Col span={{ base: 12, md: 4 }}>
							<Stack gap="lg">
								{/* 分类和状态 */}
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="md">
										<Text size="lg" fw={600}>
											分类与状态
										</Text>

										<Select
											label="产品分类"
											placeholder="选择分类"
											withAsterisk
											data={categoryOptions}
											key={form.key('category')}
											{...form.getInputProps('category')}
										/>

										<Select
											label="产品状态"
											placeholder="选择状态"
											withAsterisk
											data={statusOptions}
											key={form.key('status')}
											{...form.getInputProps('status')}
										/>

										<Switch
											label="设为精选产品"
											description="在首页展示此产品"
											key={form.key('featured')}
											{...form.getInputProps('featured', { type: 'checkbox' })}
										/>
									</Stack>
								</Paper>

								{/* 操作按钮 */}
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="md">
										<Text size="lg" fw={600}>
											操作
										</Text>

										<Button type="submit" fullWidth leftSection={<IconDeviceFloppy size={16} />}>
											{isEditMode ? '保存更改' : '创建产品'}
										</Button>

										<Button variant="default" fullWidth onClick={handleCancel}>
											取消
										</Button>

										{isEditMode && (
											<Button variant="light" color="red" fullWidth>
												删除产品
											</Button>
										)}
									</Stack>
								</Paper>

								{/* 产品信息 */}
								{isEditMode && (
									<Paper shadow="sm" p="lg" radius="md" withBorder>
										<Stack gap="xs">
											<Text size="sm" fw={600}>
												产品信息
											</Text>
											<Text size="xs" c="dimmed">
												创建时间：2024-01-15
											</Text>
											<Text size="xs" c="dimmed">
												最后更新：2024-03-10
											</Text>
											<Text size="xs" c="dimmed">
												浏览次数：1,234
											</Text>
										</Stack>
									</Paper>
								)}
							</Stack>
						</Grid.Col>
					</Grid>
				</form>
			</Stack>
		</Container>
	);
}
