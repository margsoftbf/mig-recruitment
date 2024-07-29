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
  