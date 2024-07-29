
export interface BookItemProps {
	id: number;
	title: string;
	author: string;
	description: string;
	imageUrl?: string;
	price: number;
	rating: number;
	category: number;
}

export interface FormInputProps {
	title: string;
	author: string;
	description: string;
	imageUrl?: string | null;
	price: number;
	rating: number;
	category: string;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface FormInputProps {
	title: string;
	author: string;
	description: string;
	price: number;
	rating: number;
	category: string;
}

export interface BookEditFormProps {
	bookId: string;
}
