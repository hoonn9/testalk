import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import User from './User';
import Voice from './Voice';

@Entity()
class UserVoice extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne((type) => User, (user) => user.chats, { onDelete: 'CASCADE' })
    user: User;

    @Column({ type: 'int', nullable: true })
    userId: number;

    @ManyToOne((type) => Voice, (voice) => voice.users, { onDelete: 'CASCADE' })
    voice: Voice;

    @Column({ type: 'int', nullable: true })
    voiceId: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default UserVoice;
