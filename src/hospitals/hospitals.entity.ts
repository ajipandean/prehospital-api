import { Doctors } from 'src/doctors/doctors.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Hospitals {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Doctors, (doctor) => doctor.hospital)
  doctors: Doctors;

  @Column({ nullable: true })
  standard: number;

  @Column()
  name: string;

  @Column({ length: 2 })
  accreditation: string;

  @Column()
  category: string;

  @Column()
  rating: number;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  owner: string;

  @Column()
  city: string;

  @Column()
  telp: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
