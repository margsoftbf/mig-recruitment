export class CreateBookDto {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  price: number;
  rating: number;
  category: string;
}
