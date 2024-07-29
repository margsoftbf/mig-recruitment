import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BookForm.module.css';
import { FormInputProps } from '@/types/types';
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

const BookForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
    try {
      await axios.post('http://localhost:3001/books', {
        ...data,
        imageUrl: imageUrl || '/assets/no-image.jpg',
      });
      router.push('/');
    } catch (error) {
      console.log('There was an error with adding the book: ', error);
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

  return (
    <BookFormBase
      register={register}
      errors={errors}
      handleFileChange={handleFileChange}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel="Add Book"
    >
      <button type="button" onClick={() => router.push('/')} className={styles.button}>
        Cancel
      </button>
    </BookFormBase>
  );
};

export default BookForm;