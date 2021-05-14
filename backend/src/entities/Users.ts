import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tasks } from "./Tasks";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  mobileNumber?: string;

  @Column({})
  name!: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany((_) => Tasks, (task) => task.user)
  tasks: Tasks[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
