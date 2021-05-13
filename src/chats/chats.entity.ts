import { Hospitals } from 'src/hospitals/hospitals.entity';
import { Messages } from 'src/messages/messages.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Messages, (message) => message.chat)
  messages: Messages;

  @ManyToOne(() => Users, (user) => user.chats)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Hospitals, (hospital) => hospital.chats)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospitals;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
