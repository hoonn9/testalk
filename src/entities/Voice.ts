import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    Column,
} from 'typeorm';
import UserVoice from './UserVoice';

@Entity()
class Voice extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @OneToMany((type) => UserVoice, (userVoice) => userVoice.voice)
    users: UserVoice[];

    @Column('int', { array: true })
    userIds: number[];

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Voice;
