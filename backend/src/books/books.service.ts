import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import axios from 'axios';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async onModuleInit() {
    await this.clearDatabase();
    const bookCount = await this.booksRepository.count();
    if (bookCount === 0) {
      await this.fetchInitialData();
    }
  }

  async clearDatabase() {
    await this.booksRepository.clear();
  }

  async fetchInitialData() {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=30',
    );
    console.log('Fetched books from Google API:', response.data.items.length);
    const books = response.data.items.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
      description: item.volumeInfo.description || 'No description available',
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/assets/no-image.jpg',
      price: Math.floor(Math.random() * 100),
      rating: Math.floor(Math.random() * 5) + 1,
      category: item.volumeInfo.categories?.[0] || 'Uncategorized',
    }));

    for (const book of books) {
      await this.create(book);
    }
  }

  async findAll(page: number, limit: number): Promise<[Book[], number]> {
    const [result, total] = await this.booksRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [result, total];
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOne({ where: { id } });
  }

  create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async update(id: number, updateBookDto: CreateBookDto): Promise<Book> {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }
}
