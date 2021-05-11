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

  @Column()
  hospital_id: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
