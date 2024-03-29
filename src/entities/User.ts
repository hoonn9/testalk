import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    Index,
} from 'typeorm';
import UserChat from './UserChat';
import File from './File';
import Like from './Like';
import Post from './Post';
import Comment from './Comment';
import UserVoice from './UserVoice';

const MALE = 'male';
const FEMALE = 'female';

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: 'text' })
    nickName: string;

    @Column({ type: 'timestamp' })
    birth: string;

    @Column({ type: 'text', enum: [MALE, FEMALE] })
    gender: string;

    @Column({ type: 'text', default: '' })
    intro: string;

    @OneToMany((type) => File, (file) => file.user)
    profilePhoto: File[];

    // @Column({ type: "text" })
    // profilePhoto: File[];

    @Column({ type: 'text', select: false })
    @Index({ unique: true })
    phoneNumber: string;

    @Column({ type: 'boolean', default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: 'boolean', default: false })
    isOnline: boolean;

    @Column({ type: 'double precision', default: 0 })
    lastLng: number;

    @Column({ type: 'double precision', default: 0 })
    lastLat: number;

    @Column({ type: 'text', nullable: true, select: false })
    fbId: string;

    @Column({ type: 'text', nullable: true, select: false })
    ggId: string;

    @Column({ type: 'text', nullable: true, select: false })
    kkId: string;

    @Column({ type: 'text', nullable: true })
    notifyId: string;

    @OneToMany((type) => UserChat, (userChat) => userChat.user)
    chats: UserChat[];

    @OneToMany((type) => UserVoice, (userVoice) => userVoice.user)
    voices: UserVoice[];

    @OneToMany((type) => File, (file) => file.user)
    files: File[];

    @OneToMany((type) => Like, (like) => like.user)
    likes: Like[];

    @OneToMany((type) => Like, (like) => like.likeUser)
    doLikes: Like[];

    @OneToMany((type) => Post, (post) => post.user)
    posts: Post[];

    @OneToMany((type) => Comment, (comment) => comment.user)
    comments: Comment[];

    @Column({ type: 'int', default: 0 })
    cash: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    //   get fullName(): string {
    //     return `${this.firstName} ${this.lastName}`;
    //   }

    //   public comparePassword(password: string): Promise<boolean> {
    //     return bcrypt.compare(password, this.password);
    //   }

    //   @BeforeInsert()
    //   @BeforeUpdate()
    //   async savePassword(): Promise<void> {
    //     if (this.password) {
    //       const hashedPassword = await this.hashPassword(this.password);
    //       this.password = hashedPassword;
    //     }
    //   }

    //   private hashPassword(password: string): Promise<string> {
    //     return bcrypt.hash(password, BCRYPT_ROUNDS);
    //   }
}

export default User;
