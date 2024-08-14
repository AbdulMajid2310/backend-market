// store.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  langitude: string;

  @Column()
  @IsString()
  longitude: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

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
