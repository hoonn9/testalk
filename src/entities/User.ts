import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;


    @Column({ type: "text" })
    nickName: string;

    @Column({ type: "timestamp" })
    birth: Date;

    @Column({ type: "text" })
    gender: string;

    @Column({ type: "text" })
    profilePhoto: string[];

    @Column({ type: "text" })
    phoneNumber: string;

    @Column({ type: "boolean", default: false })
    verifiedPhoneNumber: boolean;

    @Column({ type: "boolean", default: false })
    isOnline: boolean;

    @Column({ type: "double precision", default: 0 })
    lastLng: number;

    @Column({ type: "double precision", default: 0 })
    lastLat: number;

    @Column({ type: "text", nullable: true })
    fbId: string;

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
