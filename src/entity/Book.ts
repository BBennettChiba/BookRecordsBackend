import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from './User'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    isbn: String;

    @ManyToOne(type=> User, user => user.books, {cascade: true})
    user: User;
}
