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

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Post;
