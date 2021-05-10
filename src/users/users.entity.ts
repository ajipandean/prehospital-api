import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Chats } from 'src/chats/chats.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: false })
  is_deleted: boolean;

  @OneToMany(() => Chats, (chat) => chat.user)
  chats: Chats;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
}
