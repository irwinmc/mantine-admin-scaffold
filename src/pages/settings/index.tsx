import {
	Card,
	Stack,
	Title,
	Grid,
	TextInput,
	Textarea,
	Button,
	Switch,
	Select,
	Group,
	Text,
	Divider,
	Avatar,
	FileButton,
} from '@mantine/core';
import { useState } from 'react';

export function Settings() {
	const [file, setFile] = useState<File | null>(null);

	return (
		<Stack gap="lg">
			<Title order={2}>Settings</Title>

			<Grid gutter="lg">
				<Grid.Col span={{ base: 12, lg: 6 }}>
					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<Stack gap="md">
							<Text size="lg" fw={600}>
								Profile Settings
							</Text>

							<Group>
								<Avatar
									src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
									size="xl"
									radius="md"
								/>
								<Stack gap="xs">
									<FileButton onChange={setFile} accept="image/png,image/jpeg">
										{(props) => (
											<Button {...props} size="xs" variant="light">
												Upload Photo
											</Button>
										)}
									</FileButton>
									{file && (
										<Text size="xs" c="dimmed">
											Selected: {file.name}
										</Text>
									)}
								</Stack>
							</Group>

							<TextInput label="Full Name" placeholder="Enter your name" />

							<TextInput
								label="Email"
								placeholder="your.email@example.com"
								type="email"
							/>

							<TextInput label="Phone" placeholder="+1 (555) 000-0000" />

							<Textarea
								label="Bio"
								placeholder="Tell us about yourself"
								rows={4}
							/>

							<Button>Save Profile</Button>
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 6 }}>
					<Stack gap="lg">
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Stack gap="md">
								<Text size="lg" fw={600}>
									Preferences
								</Text>

								<Select
									label="Language"
									placeholder="Select language"
									data={[
										{ value: 'en', label: 'English' },
										{ value: 'zh_cn', label: '简体中文' },
										{ value: 'jp', label: '日本語' },
									]}
									defaultValue="en"
								/>

								<Select
									label="Timezone"
									placeholder="Select timezone"
									data={[
										{ value: 'utc', label: 'UTC' },
										{ value: 'est', label: 'EST' },
										{ value: 'pst', label: 'PST' },
										{ value: 'cst', label: 'CST' },
									]}
									defaultValue="utc"
								/>

								<Select
									label="Date Format"
									placeholder="Select date format"
									data={[
										{ value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
										{ value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
										{ value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
									]}
									defaultValue="MM/DD/YYYY"
								/>
							</Stack>
						</Card>

						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Stack gap="md">
								<Text size="lg" fw={600}>
									Notifications
								</Text>

								<Switch label="Email notifications" defaultChecked />

								<Switch label="Push notifications" defaultChecked />

								<Switch label="SMS notifications" />

								<Divider />

								<Switch label="Marketing emails" />

								<Switch label="Product updates" defaultChecked />
							</Stack>
						</Card>
					</Stack>
				</Grid.Col>
			</Grid>

			<Card shadow="sm" padding="lg" radius="md" withBorder>
				<Stack gap="md">
					<Text size="lg" fw={600}>
						Security
					</Text>

					<Grid>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label="Current Password"
								placeholder="Enter current password"
								type="password"
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label="New Password"
								placeholder="Enter new password"
								type="password"
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label="Confirm New Password"
								placeholder="Confirm new password"
								type="password"
							/>
						</Grid.Col>
					</Grid>

					<Switch label="Enable two-factor authentication" />

					<Group>
						<Button>Update Password</Button>
						<Button variant="light" color="red">
							Delete Account
						</Button>
					</Group>
				</Stack>
			</Card>
		</Stack>
	);
}

