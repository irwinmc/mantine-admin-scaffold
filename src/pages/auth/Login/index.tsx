import { useState } from 'react';
import {
	TextInput,
	PasswordInput,
	Button,
	Title,
	Text,
	Anchor,
	Group,
	Checkbox,
	Stack,
	Divider,
	Box,
	LoadingOverlay,
} from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle, IconBrandTwitter, IconMail, IconLock } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import { LoginIllustration } from './LoginIllustration';
import classes from './Login.module.css';

export function Login() {
	const { t } = useTranslation();
	const { login, isLoading, rememberedEmail } = useAuth();
	const [email, setEmail] = useState(rememberedEmail);
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(!!rememberedEmail);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login({ email, password, rememberMe });
			notifications.show({
				title: t('auth.login_success'),
				message: t('auth.login_success_message'),
				color: 'green',
			});
		} catch (error) {
			notifications.show({
				title: t('auth.login_failed'),
				message: error instanceof Error ? error.message : t('auth.login_failed_message'),
				color: 'red',
			});
		}
	};

	return (
		<div className={classes.wrapper}>
			{/* Left: Brand */}
			<div className={classes.brand}>
				<Stack gap="md" align="center" style={{ position: 'relative', zIndex: 1 }}>
					<Title order={2}>Mantine Admin</Title>
					<Text>{t('auth.brand_description')}</Text>
					<Box className={classes.illustration}>
						<LoginIllustration />
					</Box>
				</Stack>
			</div>

			{/* Right: Form */}
			<div className={classes.form} style={{ position: 'relative' }}>
				<LoadingOverlay visible={isLoading} overlayProps={{ radius: 'sm', blur: 2 }} />

				<Title order={2}>{t('auth.login_title')}</Title>
				<Text c="dimmed" size="sm" mt={4} mb="xl">
					{t('auth.login_subtitle')}
				</Text>

				<form onSubmit={handleSubmit}>
					<Stack gap="md">
						<TextInput
							label={t('auth.email')}
							placeholder={t('auth.email_placeholder')}
							value={email}
							onChange={e => setEmail(e.currentTarget.value)}
							required
							leftSection={<IconMail size={18} stroke={1.5} />}
						/>
						<PasswordInput
							label={t('auth.password')}
							placeholder={t('auth.password_placeholder')}
							value={password}
							onChange={e => setPassword(e.currentTarget.value)}
							required
							leftSection={<IconLock size={18} stroke={1.5} />}
						/>
						<Group justify="space-between">
							<Checkbox
								label={t('auth.remember_me')}
								checked={rememberMe}
								onChange={e => setRememberMe(e.currentTarget.checked)}
							/>
							<Anchor size="sm" onClick={() => console.log('Forgot password')}>
								{t('auth.forgot_password')}
							</Anchor>
						</Group>
						<Button type="submit" fullWidth size="md" loading={isLoading}>
							{t('auth.sign_in')}
						</Button>
					</Stack>
				</form>

				<Divider my="lg" label={t('auth.or_continue_with')} labelPosition="center" />

				<Group grow>
					<Button variant="default" leftSection={<IconBrandGoogle size={18} />} h={44}>
						Google
					</Button>
					<Button variant="default" leftSection={<IconBrandGithub size={18} />} h={44}>
						GitHub
					</Button>
					<Button variant="default" leftSection={<IconBrandTwitter size={18} />} h={44}>
						Twitter
					</Button>
				</Group>

				<Text ta="center" size="sm" mt="xl" c="dimmed">
					{t('auth.dont_have_account')}{' '}
					<Anchor onClick={() => console.log('Navigate to register')}>{t('auth.create_account')}</Anchor>
				</Text>
			</div>
		</div>
	);
}

export default Login;
