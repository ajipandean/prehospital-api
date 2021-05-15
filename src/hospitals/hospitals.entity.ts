import { Chats } from 'src/chats/chats.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Chats, (chat) => chat.hospital)
  chats: Chats;

  @OneToMany(() => Doctors, (doctor) => doctor.hospital)
  doctors: Doctors;

  @Column({ length: 8 })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'char', length: 1 })
  category: string;

  @Column()
  status: string;

  @Column({ type: 'dec' })
  rating: number;

  @Column()
  address: string;

  @Column({ type: 'dec', precision: 8, scale: 6 })
  latitude: number;

  @Column({ type: 'dec', precision: 9, scale: 6 })
  longitude: number;

  @Column()
  owner: string;

  @Column()
  telephone_number: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
