import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async addIdAndEncryptPassword() {
    this.id = uuidv4();
    this.password = await this.encryptPassword(this.password);
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  transform(): IUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
    };
  }
}

export interface IUser {
  id: string;
  email: string;
  login: string;
  createdAt?: string;
  updatedAt?: string;
}
