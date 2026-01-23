import { useState, useCallback } from 'react';

export function useDeleteCategoryModal() {
	const [opened, setOpened] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null);

	const openModal = useCallback((id: number, name: string) => {
		setCategoryToDelete({ id, name });
		setOpened(true);
	}, []);

	const closeModal = useCallback(() => {
		setOpened(false);
		setCategoryToDelete(null);
	}, []);

	const handleDelete = useCallback(
		(onConfirm: (id: number) => void) => {
			if (categoryToDelete) {
				onConfirm(categoryToDelete.id);
				closeModal();
			}
		},
		[categoryToDelete, closeModal],
	);

	return {
		opened,
		categoryToDelete,
		openModal,
		closeModal,
		handleDelete,
	};
}
