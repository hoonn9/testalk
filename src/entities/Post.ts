import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import User from "./User";
import File from "./File";
import Comment from "./Comment";
import Like from "./Like";

@Entity()
class Post extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    content: string;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @Column({ type: "int" })
    userId: number

    @OneToMany(type => File, file => file.post)
    files: File[];

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(type => Like, like => like.post)
    likes: Like[];

    @Column({ type: "int", default: 0 })
    readCount: number

    @Column({ type: "int", default: 0 })
    likeCount: number

    @Column({ type: "int", default: 0 })
    commentCount: number

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Post;
