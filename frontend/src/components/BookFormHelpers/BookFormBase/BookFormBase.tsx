import React, { ChangeEvent, ReactNode } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import styles from './BookFormBase.module.css';
import FormInput from '../FormInput/FormInput';
import ImageUpload from '../ImageUpload/ImageUpload';

interface BookFormBaseProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
	submitLabel: string;
	children?: ReactNode;
}

const BookFormBase = ({
	register,
	errors,
	handleFileChange,
	onSubmit,
	submitLabel,
	children,
}: BookFormBaseProps) => {
	const getErrorMessage = (error: any) => {
		if (error) {
			if (error.message) {
				return error.message;
			}
			if (error.type) {
				return `Error: ${error.type}`;
			}
		}
		return '';
	};

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<FormInput
				label='Title'
				id='title'
				type='text'
				register={register('title')}
				errorMessage={getErrorMessage(errors.title)}
			/>
			<FormInput
				label='Author'
				id='author'
				type='text'
				register={register('author')}
				errorMessage={getErrorMessage(errors.author)}
			/>
			<FormInput
				label='Description'
				id='description'
				type='textarea'
				register={register('description')}
				errorMessage={getErrorMessage(errors.description)}
			/>
			<ImageUpload onChange={handleFileChange} />
			<FormInput
				label='Price'
				id='price'
				type='number'
				register={register('price')}
				errorMessage={getErrorMessage(errors.price)}
			/>
			<FormInput
				label='Rating'
				id='rating'
				type='number'
				register={register('rating')}
				errorMessage={getErrorMessage(errors.rating)}
			/>
			<FormInput
				label='Category'
				id='category'
				type='text'
				register={register('category')}
				errorMessage={getErrorMessage(errors.category)}
			/>
			<div className={styles.buttonGroup}>
				<button type='submit' className={styles.button}>
					{submitLabel}
				</button>
				{children}
			</div>
		</form>
	);
};

export default BookFormBase;
