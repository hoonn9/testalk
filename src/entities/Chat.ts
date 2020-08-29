import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    Column
} from "typeorm";
import Message from "./Message";
import UserChat from "./UserChat";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];

    @OneToMany(type => UserChat, userChat => userChat.chat)
    users: UserChat[];

    @Column("int", {array: true})
    userIds: number[];

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Chat;
