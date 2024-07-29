import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookItemProps } from '@/types/types';
import BookItem from '@/components/BookItem/BookItem';
import Link from 'next/link';

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

	const renderPaginationButtons = () => {
		const pageNumbers = [];
		const maxPageButtons = 3;
		const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
		const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers.map((page) => (
			<button
				key={page}
				onClick={() => handlePageChange(page)}
				className={currentPage === page ? 'activePage' : ''}
			>
				{page}
			</button>
		));
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
			<div className='pagination'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					&laquo; Prev
				</button>
				{renderPaginationButtons()}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next &raquo;
				</button>
			</div>
		</div>
	);
};

export default Home;
