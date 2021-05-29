import { Chats } from 'src/chats/chats.entity';
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
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chats, (chat) => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat: Chats;

  @Column()
  message: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  response: string;

  @Column({ nullable: true })
  condition: string;

  @Column({ nullable: true })
  action: string;

  @Column({ nullable: true })
  attachments: string;

  @Column()
  creation_time: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
