import { Hospitals } from 'src/hospitals/hospitals.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Doctors {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hospitals, (hospital) => hospital.doctors)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospitals;

  @Column()
  group_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fcm_token: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
