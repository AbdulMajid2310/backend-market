// User.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  nama_lengkap: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  role_id: string;

  @Column()
  @IsNumber()
  is_active: number;

  @CreateDateColumn()
  tanggal_input: Date;

  @UpdateDateColumn()
  tanggal_update: Date;
}
