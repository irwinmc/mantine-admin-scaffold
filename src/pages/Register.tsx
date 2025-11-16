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
} from '@mantine/core';
import { useNavigate } from 'react-router';
import classes from './Login.module.css';

export function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		// TODO: 实现注册逻辑
		console.log('Register:', { name, email, password });
		// 注册成功后跳转到登录页
		navigate('/login');
	};

	return (
		<div className={classes.wrapper}>
			<Container size={500}>
				<Paper shadow="xl" radius="lg" p="xl">
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

								<Button type="submit" fullWidth size="md" radius="md" mt="md">
									Create account
								</Button>
							</Stack>
						</form>

						<Box>
							<Text size="xs" c="dimmed" ta="center">
								By signing up, you agree to our{' '}
								<Anchor size="xs" href="#">
									Terms of Service
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

