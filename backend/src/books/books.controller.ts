import { Controller, Get, Post, Put, Body, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ) {
    const [result, total] = await this.booksService.findAll(
      Number(page),
      Number(limit),
    );

    res.setHeader('x-total-count', total.toString());
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
    
    return res.json(result); 
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }
}
