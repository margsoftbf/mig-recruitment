import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({nullable: true})
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  rating: number;

  @Column()
  category: string;
}
