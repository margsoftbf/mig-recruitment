import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Book.module.css';
import { BookItemProps } from '@/types/types';
import Link from 'next/link';

const BookPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [book, setBook] = useState<BookItemProps | null>(null);

	useEffect(() => {
		if (id) {
			axios
				.get(`http://localhost:3001/books/${id}`)
				.then((response) => setBook(response.data))
				.catch((error) => console.error(error));
		}
	}, [id]);

	if (!book) return <div>Loading...</div>;

	const handleBackClick = () => {
		router.push('/');
	};

	return (
		<div className={styles.container}>
			<div className={styles.bookContainer}>
				<button onClick={handleBackClick} className={styles.backButton}>
					Back
				</button>
				<Link href={`/edit-book/${id}`} passHref>
					<button className={styles.backButton}>Edit</button>
				</Link>
				<div className={styles.upperContainer}>
					<div className={styles.imageContainer}>
						{book.imageUrl && <img src={book.imageUrl} alt={book.title} />}
					</div>
					<div className={styles.infoContainer}>
						<h1 className={styles.title}>{book.title}</h1>
						<p>
							<strong>Author:</strong> {book.author}
						</p>
						<p>
							<strong>Price:</strong> ${book.price}
						</p>
						<p>
							<strong>Rating:</strong> {book.rating}/5
						</p>
						<p>
							<strong>Category:</strong> {book.category}
						</p>
					</div>
				</div>
				<div className={styles.descriptionContainer}>
					<p>
						<strong>Description:</strong> {book.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BookPage;
