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
	Stack,
	Box,
	LoadingOverlay,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { notifications } from '@mantine/notifications';
import classes from '../Login/Login.module.css';

export function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();
	const { register, isLoading } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			notifications.show({
				title: '密码不匹配',
				message: '请确认您的密码输入正确',
				color: 'red',
			});
			return;
		}

		try {
			await register({ name, email, password });
			notifications.show({
				title: '注册成功',
				message: '请检查您的邮箱以验证账户',
				color: 'green',
			});
			navigate('/login');
		} catch (error) {
			notifications.show({
				title: '注册失败',
				message: error instanceof Error ? error.message : '请稍后再试',
				color: 'red',
			});
		}
	};

	return (
		<div className={classes.wrapper}>
			<Container size={500}>
				<Paper shadow="xl" radius="lg" p="xl" pos="relative">
					<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
					<Stack gap="lg">
						<div>
							<Title order={2} fw={700} mb="xs">
								Create an account
							</Title>
							<Text size="sm" c="dimmed">
								Already have an account?{' '}
								<Anchor size="sm" fw={500} onClick={() => navigate('/login')}>
									Sign in
								</Anchor>
							</Text>
						</div>

						<form onSubmit={handleSubmit}>
							<Stack gap="md">
								<TextInput
									label="Full name"
									placeholder="John Doe"
									value={name}
									onChange={e => setName(e.currentTarget.value)}
									required
									size="md"
								/>

								<TextInput
									label="Email address"
									placeholder="your@email.com"
									type="email"
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

								<PasswordInput
									label="Confirm password"
									placeholder="Confirm your password"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.currentTarget.value)}
									required
									size="md"
								/>

								<Button type="submit" fullWidth size="md" radius="md" mt="md" loading={isLoading}>
									Create account
								</Button>
							</Stack>
						</form>

						<Box>
							<Text size="xs" c="dimmed" ta="center">
								By signing up, you agree to our{' '}
								<Anchor size="xs" href="#">
									Tererms of Service
								</Anchor>{' '}
								and{' '}
								<Anchor size="xs" href="#">
									Privacy Policy
								</Anchor>
							</Text>
						</Box>
					</Stack>
				</Paper>
			</Container>
		</div>
	);
}

export default Register;
