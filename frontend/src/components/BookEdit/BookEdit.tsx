import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BookEdit.module.css';
import { FormInputProps, BookEditFormProps } from '@/types/types';
import BookFormBase from '../BookFormHelpers/BookFormBase/BookFormBase';

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	author: yup.string().required('Author is required'),
	description: yup.string().required('Description is required'),
	price: yup
		.number()
		.typeError('Price must be a number')
		.required('Price is required')
		.positive('Must be a positive number'),
	rating: yup
		.number()
		.typeError('Rating must be a number')
		.required('Rating is required')
		.min(0, 'Min value is 0')
		.max(5, 'Max value is 5'),
	category: yup.string().required('Category is required'),
});

const BookEditForm = ({ bookId }: BookEditFormProps) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [bookData, setBookData] = useState<FormInputProps | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormInputProps>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/books/${bookId}`
				);
				const book = response.data;
				setBookData(book);
				setValue('title', book.title);
				setValue('author', book.author);
				setValue('description', book.description);
				setValue('price', book.price);
				setValue('rating', book.rating);
				setValue('category', book.category);
				setImageUrl(book.imageUrl);
			} catch (error) {
				console.error('Error fetching book:', error);
			}
		};
		fetchBook();
	}, [bookId, setValue]);

	const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
		try {
			await axios.put(`http://localhost:3001/books/${bookId}`, {
				...data,
				imageUrl: imageUrl || '/assets/no-image.jpg',
			});
			router.push('/');
		} catch (error) {
			console.log('There was an error updating the book: ', error);
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	if (!bookData) return <div>Loading...</div>;

	return (
		<BookFormBase
			register={register}
			errors={errors}
			handleFileChange={handleFileChange}
			onSubmit={handleSubmit(onSubmit)}
			submitLabel='Save'
		>
			<button
				type='button'
				onClick={() => router.push('/')}
				className={styles.button}
			>
				Cancel
			</button>
		</BookFormBase>
	);
};

export default BookEditForm;
