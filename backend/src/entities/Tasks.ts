import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ default: false, nullable: false })
  done: boolean;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  time: string;

  @ManyToOne((_) => Users, (user) => user.tasks)
  user: Users;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
