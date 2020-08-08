import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    Index
} from "typeorm";
import Chat from "./Chat";
import File from "./File";
import Like from "./Like";

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text" })
    nickName: string;

    @Column({ type: "timestamp" })
    birth: string;

    @Column({ type: "text" })
    gender: string;

    @Column({ type: "text", default: "" })
    intro: string;

    @OneToMany(type => File, file => file.user)
    profilePhoto: File[];

    // @Column({ type: "text" })
    // profilePhoto: File[];

    @Column({ type: "text", select: false })
    @Index({ unique: true })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: "boolean", default: false })
    isOnline: boolean;

    @Column({ type: "double precision", default: 0 })
    lastLng: number;

    @Column({ type: "double precision", default: 0 })
    lastLat: number;

    @Column({ type: "text", nullable: true, select: false })
    fbId: string;

    @Column({ type: "text", nullable: true, select: false })
    ggId: string;

    @Column({ type: "text", nullable: true, select: false })
    kkId: string;

    @Column({ type: "text", nullable: true })
    notifyId: string;

    @ManyToMany(type => Chat, chat => chat.users)
    @JoinTable()
    chats: Chat[];

    @OneToMany(type => File, file => file.user)
    files: File[];

    @OneToMany(type => Like, like => like.user)
    likes: Like[];

    @OneToMany(type => Like, like => like.likeUser)
    doLikes: Like[];

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
