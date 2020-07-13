import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import Chat from "./Chat";

@Entity()
class Message extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(type => Chat, chat => chat.messages, { onDelete: "CASCADE" })
    chat: Chat;

    @Column({ nullable: true })
    chatId: number;

    @Column({ type: "text" })
    text: string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Message;
