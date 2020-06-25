import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import User from "./User";
import Message from "./Message";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];

    @ManyToMany(type => User)
    @JoinTable()
    users: User[];

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Chat;
