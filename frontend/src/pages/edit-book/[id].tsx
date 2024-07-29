import React from 'react';
import { useRouter } from 'next/router';
import BookEdit from '@/components/BookEdit/BookEdit';
import styles from './Edit.module.css';

const EditBookPage = () => {
	const router = useRouter();
	const { id } = router.query;

	if (!id) {
		return <div>Loading...</div>;
	}

	return (
		<div className='form-box'>
			<h1 className='title'>Edit book</h1>
			<BookEdit bookId={Number(id)} />
		</div>
	);
};

export default EditBookPage;
