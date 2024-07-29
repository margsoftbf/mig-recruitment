import React from 'react';
import styles from './Pagination.module.css';
import { PaginationProps } from '@/types/types';

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	
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
				onClick={() => onPageChange(page)}
				className={currentPage === page ? styles.activePage : ''}
			>
				{page}
			</button>
		));
	};

	return (
		<div className={styles.pagination}>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&laquo; Prev
			</button>
			{renderPaginationButtons()}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next &raquo;
			</button>
		</div>
	);
};

export default Pagination;
