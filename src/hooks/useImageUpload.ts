import { useMutation } from '@tanstack/react-query';

const uploadImageFn = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Upload failed');
	}

	const data = await response.json();
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
