import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import User from "./User";
import Chat from "./Chat";

@Entity()
class UserChat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(type => User, user => user.chats)
    user: User;

    @Column({ type: "int", nullable: true })
    userId: number;

    @ManyToOne(type => Chat, chat => chat.users)
    chat: Chat;

    @Column({ type: "int", nullable: true })
    chatId: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default UserChat;