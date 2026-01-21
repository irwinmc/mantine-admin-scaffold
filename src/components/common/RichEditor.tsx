/**
 * RichEditor - 通用富文本编辑器组件
 * 基于 @mantine/tiptap 实现，支持图文混排
 */

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor, type Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';

interface RichEditorProps {
	value?: string;
	onChange?: (content: string) => void;
	placeholder?: string;
	label?: string;
	withAsterisk?: boolean;
	error?: string;
	description?: string;
	readonly?: boolean;
	extensions?: Extension[];
}

const DEFAULT_TOOLBAR: string[][] = [
	['bold', 'italic', 'underline', 'strike'],
	['h1', 'h2', 'h3'],
	['bulletList', 'orderedList'],
	['blockquote', 'codeBlock'],
	['link', 'image'],
	['textAlignLeft', 'textAlignCenter', 'textAlignRight'],
	['clear'],
];

export function RichEditor({
	value = '',
	onChange,
	placeholder = '请输入内容...',
	label,
	withAsterisk,
	error,
	description,
	readonly = false,
	extensions = [],
}: RichEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: { keepMarks: true, keepAttributes: false },
				orderedList: { keepMarks: true, keepAttributes: false },
			}),
			Underline,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-blue-500 underline',
				},
			}),
			Image.configure({
				HTMLAttributes: {
					class: 'rounded-lg max-w-full h-auto',
				},
				allowBase64: false,
				inline: false,
			}),
			Color,
			TextStyle,
			Placeholder.configure({
				placeholder,
				emptyEditorClass: 'is-editor-empty',
			}),
			...extensions,
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: readonly ? 'richtext-readonly' : '',
			},
		},
		editable: !readonly,
	});

	const handleImageUpload = async (file: File) => {
		const url = URL.createObjectURL(file);
		editor?.chain().focus().setImage({ src: url }).run();
	};

	return (
		<div>
			{label && (
				<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
					{label}
					{withAsterisk && <span className="ml-1 text-red-500">*</span>}
				</label>
			)}

			{!readonly && (
				<RichTextEditor editor={editor}>
					<RichTextEditor.Toolbar sticky stickyOffset={60}>
						{DEFAULT_TOOLBAR.map(group => (
							<RichTextEditor.ControlsGroup key={group.join(',')}>
								{group.map(control => {
									switch (control) {
										case 'bold':
											return <RichTextEditor.Bold key={control} />;
										case 'italic':
											return <RichTextEditor.Italic key={control} />;
										case 'underline':
											return <RichTextEditor.Underline key={control} />;
										case 'strike':
											return <RichTextEditor.Strikethrough key={control} />;
										case 'h1':
											return <RichTextEditor.H1 key={control} />;
										case 'h2':
											return <RichTextEditor.H2 key={control} />;
										case 'h3':
											return <RichTextEditor.H3 key={control} />;
										case 'bulletList':
											return <RichTextEditor.BulletList key={control} />;
										case 'orderedList':
											return <RichTextEditor.OrderedList key={control} />;
										case 'blockquote':
											return <RichTextEditor.Blockquote key={control} />;
										case 'codeBlock':
											return <RichTextEditor.CodeBlock key={control} />;
										case 'link':
											return <RichTextEditor.Link key={control} />;
										case 'image':
											return (
												<RichTextEditor.Control key={control}>
													<input
														type="file"
														accept="image/*"
														onChange={e => {
															const file = e.target.files?.[0];
															if (file) handleImageUpload(file);
														}}
														className="hidden"
														id={`rich-editor-image-${Math.random()}`}
													/>
													<label
														htmlFor={`rich-editor-image-${Math.random()}`}
														className="cursor-pointer"
													>
														Image
													</label>
												</RichTextEditor.Control>
											);
										case 'textAlignLeft':
											return <RichTextEditor.AlignLeft key={control} />;
										case 'textAlignCenter':
											return <RichTextEditor.AlignCenter key={control} />;
										case 'textAlignRight':
											return <RichTextEditor.AlignRight key={control} />;
										case 'clear':
											return <RichTextEditor.ClearFormatting key={control} />;
										default:
											return null;
									}
								})}
							</RichTextEditor.ControlsGroup>
						))}
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
			)}

			{readonly && editor && (
				<div
					className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
					dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
				/>
			)}

			{description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}

			{error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
		</div>
	);
}
