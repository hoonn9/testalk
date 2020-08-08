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

@Entity()
class Like extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(type => User, user => user.likes, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(type => User, user => user.doLikes, { onDelete: "CASCADE" })
    likeUser: User;

    @Column({ type: "int" })
    likeUserId: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Like;