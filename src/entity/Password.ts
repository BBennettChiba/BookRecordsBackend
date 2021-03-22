import {Entity, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from './User'

@Entity()
export class Password {
    @Column({primary: true})
    password: String;

    @OneToOne(type=> User, user => user.id)
    @JoinColumn()
    user: User;
}
