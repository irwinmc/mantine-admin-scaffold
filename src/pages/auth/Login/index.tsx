import { useState } from 'react';
import {
	Paper,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Text,
	Anchor,
	Container,
	Group,
	Checkbox,
	Stack,
	Box,
	Avatar,
	LoadingOverlay,
} from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import classes from './Login.module.css';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const { login, isLoading } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await login({ email, password });
			notifications.show({
				title: '登录成功',
				message: '欢迎回来！',
				color: 'green',
			});
		} catch (error) {
			notifications.show({
				title: '登录失败',
				message: error instanceof Error ? error.message : '请检查您的凭据',
				color: 'red',
			});
		}
	};

	return (
		<div className={classes.wrapper}>
			<Container size={1000}>
				<Paper shadow="xl" radius="lg" className={classes.card}>
					<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
					<div className={classes.content}>
						<div className={classes.form}>
							<Stack gap="lg">
								<div>
									<Title order={2} fw={700} mb="xs">
										Sign in
									</Title>
									<Text size="sm" c="dimmed">
										Don't have an account?{' '}
										<Anchor size="sm" fw={500} onClick={() => navigate('/register')}>
											Sign up
										</Anchor>
									</Text>
								</div>

								<form onSubmit={handleSubmit}>
									<Stack gap="md">
										<TextInput
											label="Email address"
											placeholder="your@email.com"
											value={email}
											onChange={e => setEmail(e.currentTarget.value)}
											required
											size="md"
										/>

										<PasswordInput
											label="Password"
											placeholder="Your password"
											value={password}
											onChange={e => setPassword(e.currentTarget.value)}
											required
											size="md"
										/>

										<Group justify="space-between">
											<Checkbox
												label="Remember me"
												checked={rememberMe}
												onChange={e => setRememberMe(e.currentTarget.checked)}
											/>
											<Anchor size="sm" onClick={() => console.log('Forgot password')}>
												Forgot password?
											</Anchor>
										</Group>

										<Button type="submit" fullWidth size="md" radius="md" loading={isLoading}>
											Sign in
										</Button>
									</Stack>
								</form>

								<div>
									<Text size="sm" c="dimmed" ta="center" mb="md">
										Or continue with
									</Text>
									<Group grow>
										<Button
											variant="default"
											leftSection={<IconBrandGoogle size={16} />}
											radius="md"
										>
											Google
										</Button>
										<Button
											variant="default"
											leftSection={<IconBrandGithub size={16} />}
											radius="md"
										>
											GitHub
										</Button>
										<Button
											variant="default"
											leftSection={<IconBrandTwitter size={16} />}
											radius="md"
										>
											Twitter
										</Button>
									</Group>
								</div>
							</Stack>
						</div>

						<div className={classes.hero}>
							<Stack gap="xl" align="center" justify="center" h="100%">
								<Title order={1} fw={700} c="white" ta="center" className={classes.heroTitle}>
									Welcome to
									<br />
									Mantine Admin
								</Title>

								<Text size="lg" c="rgba(255, 255, 255, 0.8)" ta="center" maw={500}>
									Build organized and well-coded dashboards full of beautiful and rich modules. Join
									us and start building your application today.
								</Text>

								<Box>
									<Group gap="xs" justify="center" mb="sm">
										<Avatar
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
											size="md"
											radius="xl"
										/>
										<Avatar
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
											size="md"
											radius="xl"
										/>
										<Avatar
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
											size="md"
											radius="xl"
										/>
										<Avatar
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
											size="md"
											radius="xl"
										/>
									</Group>
									<Text size="sm" c="rgba(255, 255, 255, 0.7)" ta="center">
										More than 17k people joined us, it's your turn
									</Text>
								</Box>
							</Stack>
						</div>
					</div>
				</Paper>
			</Container>
		</div>
	);
}

export default Login;
