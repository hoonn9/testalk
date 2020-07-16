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

const CHAT = "CHAT";
const LEAVE = "LEAVE"

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

    @Column({ type: "text", enum: [CHAT, LEAVE], default: CHAT })
    target: string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Message;
