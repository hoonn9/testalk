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
class Like extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(type => User, user => user.likes, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "int", nullable: true })
    userId: number;

    @ManyToOne(type => Post, post => post.likes, { onDelete: "CASCADE" })
    post: Post;

    @Column({ type: "int", nullable: true })
    postId: number;

    @ManyToOne(type => User, user => user.doLikes, { onDelete: "CASCADE" })
    likeUser: User;

    @Column({ type: "int" })
    likeUserId: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Like;