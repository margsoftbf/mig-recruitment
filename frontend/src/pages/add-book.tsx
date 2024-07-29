import React from 'react';
import BookForm from '@/components/BookForm/BookForm';

const AddBook = () => {
	return (
		<div className='form-box'>
			<h1 className='title'>Add a New Book</h1>
			<BookForm />
		</div>
	);
};

export default AddBook;
