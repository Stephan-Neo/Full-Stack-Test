import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, login): Promise<IUser> {
    const user = await this.usersRepository.create({
      email,
      password,
      login,
    });
    return (await this.usersRepository.save(user)).transform();
  }

  async updateUser(id: string, email?: string, login?: string): Promise<IUser> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Not Found User');
    }

    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) {
      throw new HttpException('This Email Employed', 408);
    }

    Object.assign(user, {
      email,
      login,
    });
    return (await this.usersRepository.save(user)).transform();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await this.usersRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new HttpException('Not Found User By this id', 404);
    }

    return (await this.usersRepository.remove(user)).transform();
  }

  async findAll(): Promise<IUser[]> {
    return (await this.usersRepository.find()).map((item) => item.transform());
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      email: email,
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({
      login: login,
    });
  }
}
