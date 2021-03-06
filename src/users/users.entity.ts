import {
  BeforeInsert,
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
import * as bcrypt from 'bcrypt';
import { Chats } from 'src/chats/chats.entity';
import { Hospitals } from 'src/hospitals/hospitals.entity';

enum AccountTypes {
  NURSE = 'NURSE',
  DOCTOR = 'DOCTOR',
  DRIVER = 'DRIVER',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hospitals, (hospital) => hospital.users)
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospitals;

  @OneToMany(() => Chats, (chat) => chat.user)
  chats: Chats;

  @Column({
    type: 'enum',
    enum: AccountTypes,
    default: AccountTypes.NURSE,
    name: 'account_type',
  })
  account_type: AccountTypes;

  @Column({ nullable: true })
  group_name: string;

  @Column({ type: 'varchar', length: 14 })
  telp: string;

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

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
}
