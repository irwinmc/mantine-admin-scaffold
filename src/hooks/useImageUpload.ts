import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

const uploadImageFn = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	const data = await ky
		.post('/api/upload', {
			body: formData,
		})
		.json<{ url: string }>();

	return data.url;
};

export function useImageUpload() {
	const mutation = useMutation({
		mutationFn: uploadImageFn,
	});

	return {
		uploadImage: mutation.mutateAsync,
		isUploading: mutation.isPending,
		error: mutation.error,
		reset: mutation.reset,
	};
}
