import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookItemProps } from '@/types/types';
import BookItem from '@/components/BookItem/BookItem';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

const Home = () => {
	const [books, setBooks] = useState<BookItemProps[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 9;

	const fetchBooks = async (page: number) => {
		try {
			const response = await axios.get(
				`http://localhost:3001/books?page=${page}&limit=${limit}`
			);
			const fetchedBooks = response.data;
			const totalCount = response.headers['x-total-count'];

			setBooks(fetchedBooks);
			setTotalPages(Math.ceil(Number(totalCount) / limit));
		} catch (error) {
			console.error('Error fetching books:', error);
		}
	};

	useEffect(() => {
		fetchBooks(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};



	return (
		<div className='container'>
			<h1 className='title'>Books List</h1>
			<Link href='/add-book'>
				<button className='button'>Add New Book</button>
			</Link>
			<ul className='book-list'>
				{books.map((book) => (
					<BookItem
						key={book.id}
						id={book.id}
						title={book.title}
						author={book.author}
						description={book.description}
						imageUrl={book.imageUrl}
						price={book.price}
						rating={book.rating}
						category={book.category}
					/>
				))}
			</ul>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default Home;
