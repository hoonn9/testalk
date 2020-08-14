import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    AfterRemove
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
class File extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(type => User, user => user.files, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(type => Post, post => post.files, { onDelete: "CASCADE" })
    post: Post;

    @Column({ type: "int", nullable: true })
    postId: number;

    @Column({ type: "text" })
    url: string;

    @Column({ type: "text" })
    key: string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    @AfterRemove()
    async removeBucket(): Promise<void> {
        if (this.key) {
            // S3 버킷에서 삭제
        }
    }
}

export default File;