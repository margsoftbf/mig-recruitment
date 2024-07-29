import React from 'react';
import { BookItemProps } from '@/types/types';
import styles from './BookItem.module.css';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const BookItem = ({
	id,
	title,
	author,
	description,
	imageUrl,
	price,
	rating,
	category,
}: BookItemProps) => {
	const renderStars = (rating: number = 0) => {
		const numRating = rating;
		let stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				<span
					key={i}
					className={i < numRating ? styles.starFilled : styles.starEmpty}
				>
					<StarIcon className={styles.starIcon} />
				</span>
			);
		}
		return stars;
	};

	return (
		<Link href={`/book/${id}`} passHref>
			<li className={styles.box}>
				<div>
					<img src={imageUrl} alt={title} className={styles.image} />
				</div>
				<div className={styles.desc}>
					<h2 className={styles.title}>
						{title.slice(0, 35)}
						{title.length > 35 && '...'}
					</h2>
					<div className={styles.subdesc}>
						<p>
							Author:{' '}
							<span className={styles.author}>
								{author.slice(0, 15)}
								{author.length > 15 && '...'}
							</span>
						</p>
						<p>
							Price: <span className={styles.price}>${price}</span>
						</p>
						<p>Rating: {renderStars(rating || 0)}</p>
						<p>
							Category: <span className={styles.category}>{category}</span>
						</p>
					</div>
				</div>
			</li>
		</Link>
	);
};

export default BookItem;
