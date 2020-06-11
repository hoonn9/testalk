import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
} from "typeorm";
import { verificationTarget } from "src/types/types";

const PHONE = "PHONE";

@Entity()
class Verification extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "text", enum: [PHONE] })
    target: verificationTarget;

    @Column({ type: "text" })
    payload: string;

    @Column({ type: "text" })
    key: string;

    @Column({ type: "boolean", default: false })
    verified: boolean;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

    @BeforeInsert()
    createKey(): void {
        if (this.target === PHONE) {
            let result = Math.floor(Math.random() * 1000000) + 100000;
            if (result > 1000000) {
                result = result - 100000
            }
            this.key = result.toString();
        }
    }
}

export default Verification;
