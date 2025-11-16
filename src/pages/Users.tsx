import {
	Card,
	Stack,
	Title,
	Button,
	TextInput,
	Group,
	Avatar,
	Badge,
	ActionIcon,
	Menu,
	rem,
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import {
	IconSearch,
	IconPlus,
	IconDots,
	IconEdit,
	IconTrash,
	IconEye,
} from '@tabler/icons-react';

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: 'active' | 'inactive' | 'pending';
	avatar: string;
	joinDate: string;
}

export function Users() {
	const [search, setSearch] = useState('');

	const users: User[] = [
		{
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			role: 'Admin',
			status: 'active',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
			joinDate: '2024-01-15',
		},
		{
			id: '2',
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			role: 'Manager',
			status: 'active',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
			joinDate: '2024-02-20',
		},
		{
			id: '3',
			name: 'Bob Johnson',
			email: 'bob.johnson@example.com',
			role: 'User',
			status: 'inactive',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
			joinDate: '2024-03-10',
		},
		{
			id: '4',
			name: 'Alice Williams',
			email: 'alice.williams@example.com',
			role: 'Manager',
			status: 'active',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
			joinDate: '2024-04-05',
		},
		{
			id: '5',
			name: 'Charlie Brown',
			email: 'charlie.brown@example.com',
			role: 'User',
			status: 'pending',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
			joinDate: '2024-05-12',
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'green';
			case 'inactive':
				return 'red';
			case 'pending':
				return 'orange';
			default:
				return 'gray';
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'Admin':
				return 'blue';
			case 'Manager':
				return 'cyan';
			case 'User':
				return 'gray';
			default:
				return 'gray';
		}
	};

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(search.toLowerCase()) ||
			user.email.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Stack gap="lg">
			<Group justify="space-between" align="center">
				<Title order={2}>Users</Title>
				<Button leftSection={<IconPlus size={16} />}>Add User</Button>
			</Group>

			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Stack gap="md">
					<TextInput
						placeholder="Search users..."
						leftSection={<IconSearch size={16} />}
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
						w={300}
					/>

					<DataTable
						withTableBorder
						withColumnBorders
						striped
						highlightOnHover
						records={filteredUsers}
						columns={[
							{
								accessor: 'name',
								title: 'User',
								render: (user) => (
									<Group gap="sm">
										<Avatar src={user.avatar} size="sm" radius="xl" />
										<div>
											<div>{user.name}</div>
											<div style={{ fontSize: '0.85rem', color: 'gray' }}>
												{user.email}
											</div>
										</div>
									</Group>
								),
							},
							{
								accessor: 'role',
								title: 'Role',
								render: (user) => (
									<Badge variant="light" color={getRoleColor(user.role)}>
										{user.role}
									</Badge>
								),
							},
							{
								accessor: 'status',
								title: 'Status',
								render: (user) => (
									<Badge variant="dot" color={getStatusColor(user.status)}>
										{user.status.charAt(0).toUpperCase() + user.status.slice(1)}
									</Badge>
								),
							},
							{
								accessor: 'joinDate',
								title: 'Join Date',
							},
							{
								accessor: 'actions',
								title: 'Actions',
								textAlign: 'center',
								render: () => (
									<Menu shadow="md" width={180}>
										<Menu.Target>
											<ActionIcon variant="subtle" color="gray">
												<IconDots size={16} />
											</ActionIcon>
										</Menu.Target>
										<Menu.Dropdown>
											<Menu.Item
												leftSection={
													<IconEye style={{ width: rem(14), height: rem(14) }} />
												}
											>
												View Details
											</Menu.Item>
											<Menu.Item
												leftSection={
													<IconEdit
														style={{ width: rem(14), height: rem(14) }}
													/>
												}
											>
												Edit
											</Menu.Item>
											<Menu.Divider />
											<Menu.Item
												color="red"
												leftSection={
													<IconTrash
														style={{ width: rem(14), height: rem(14) }}
													/>
												}
											>
												Delete
											</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								),
							},
						]}
					/>
				</Stack>
			</Card>
		</Stack>
	);
}

