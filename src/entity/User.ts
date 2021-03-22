import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, OneToMany} from "typeorm";
import {Book} from './Book'
import {Password} from './Password'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", length: 200})
    firstName: string;

    @Column({type: "varchar", length: 200})
    lastName: string;

    @Column({type: "varchar", length: 200})
    userName: String;

    @OneToMany(type=> Book, books => books.user)
    @JoinTable()
    books: Book[];

    @OneToOne(type => Password, password => password.user, {cascade: true})
    password: Password;
}
