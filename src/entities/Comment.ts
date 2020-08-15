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
import Post from "./Post";

@Entity()
class Comment extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "int", nullable: true })
    parentId: number;

    @Column({ type: "text" })
    content: string;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;

    @Column({ type: "int" })
    postId: number;

    @Column({ type: "int" })
    depth: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Comment;
