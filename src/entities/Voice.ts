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

    @Column('text')
    channelName: string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    // @AfterInsert()
    // async initChannelName(): Promise<void> {
    //     if (this.userIds) {
    //         this.channelName = `${this.userIds[0]}:${this.userIds[1]}`;
    //         this.save();
    //     }
    // }
}

export default Voice;
