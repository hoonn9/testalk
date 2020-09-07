import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const MALE = 'male';
const FEMALE = 'female';

@Entity()
class VoiceWait extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'timestamp' })
    birth: string;

    @Column({ type: 'text', enum: [MALE, FEMALE] })
    gender: string;

    @Column({ type: 'double precision', default: 0 })
    lastLng: number;

    @Column({ type: 'double precision', default: 0 })
    lastLat: number;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default VoiceWait;
