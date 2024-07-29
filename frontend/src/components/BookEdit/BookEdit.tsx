import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BookEdit.module.css';
import { FormInputProps } from '@/types/types';

interface BookEditFormProps {
	bookId: number;
}

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
			console.log('Submitting data:', data); 
			const response = await axios.put(
				`http://localhost:3001/books/${bookId}`,
				{
					...data,
					imageUrl: imageUrl || '/assets/no-image.jpg',
				}
			);
			console.log('Response:', response); 
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
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.formGroup}>
				<label htmlFor='title' className={styles.label}>
					Title
				</label>
				<div className={styles.formInputGroup}>
					<input
						type='text'
						id='title'
						{...register('title')}
						className={styles.input}
					/>
					<p className={styles.error}>{errors.title?.message}</p>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='author' className={styles.label}>
					Author
				</label>
				<div className={styles.formInputGroup}>
					<input
						id='author'
						type='text'
						{...register('author')}
						className={styles.input}
					/>
					<p className={styles.error}>{errors.author?.message}</p>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='description' className={styles.label}>
					Description
				</label>
				<div className={styles.formInputGroup}>
					<textarea
						id='description'
						{...register('description')}
						className={styles.textarea}
					/>
					<p className={styles.error}>{errors.description?.message}</p>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='imageUrl' className={styles.label}>
					Image URL
				</label>
				<div className={styles.formInputGroup}>
					<input
						type='file'
						id='file-upload'
						{...register('imageUrl')}
						className={styles.fileInput}
						onChange={handleFileChange}
					/>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='price' className={styles.label}>
					Price
				</label>
				<div className={styles.formInputGroup}>
					<input
						id='price'
						type='number'
						{...register('price')}
						className={styles.input}
					/>
					<p className={styles.error}>{errors.price?.message}</p>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='rating' className={styles.label}>
					Rating
				</label>
				<div className={styles.formInputGroup}>
					<input
						id='rating'
						type='number'
						{...register('rating')}
						className={styles.input}
					/>
					<p className={styles.error}>{errors.rating?.message}</p>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor='category' className={styles.label}>
					Category
				</label>
				<div className={styles.formInputGroup}>
					<input
						id='category'
						type='text'
						{...register('category')}
						className={styles.input}
					/>
					<p className={styles.error}>{errors.category?.message}</p>
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<button type='submit' className={styles.button}>
					Save
				</button>
				<button
					type='button'
					onClick={() => router.push('/')}
					className={styles.button}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default BookEditForm;
