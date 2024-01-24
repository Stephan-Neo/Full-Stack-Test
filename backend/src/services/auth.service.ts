import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { generate as jwtGenerate } from '../utils/jwt';
import * as moment from 'moment-timezone';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async signUp(email: string, pass: string, login: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new UnauthorizedException('User Already Exists');
    }

    const userByLogin = await this.usersService.findByLogin(login);

    if (userByLogin) {
      throw new UnauthorizedException('User Already Exists');
    }
    return await this.usersService.createUser(email, pass, login);
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Not user that email');
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Password not match');
    }

    const auth = await this.authRepository.findOneBy({
      userId: user.id,
    });

    if (auth) {
      await this.authRepository.remove(auth);
    }

    const accessTokenExpires = moment()
      .add(process.env.JWT_EXPIRATION_MINUTES, 'minutes')
      .toDate();
    const accessToken = jwtGenerate(user.id, accessTokenExpires);
    const authCreated = await this.authRepository.create({
      userId: user.id,
      accessToken: accessToken,
      accessTokenExpires: accessTokenExpires,
    });
    return await this.authRepository.save(authCreated);
  }

  async refreshToken(userId: string, token: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Not user that id');
    }

    const auth = await this.authRepository.findOneBy({
      userId: userId,
      accessToken: token,
    });

    if (!auth) {
      throw new UnauthorizedException('Not Found Token For This User');
    }

    await this.authRepository.remove(auth);
    const accessTokenExpires = moment()
      .add(process.env.JWT_EXPIRATION_MINUTES, 'minutes')
      .toDate();
    const accessToken = jwtGenerate(userId, accessTokenExpires);
    const authCreated = await this.authRepository.create({
      userId: userId,
      accessToken: accessToken,
      accessTokenExpires: accessTokenExpires,
    });
    return await this.authRepository.save(authCreated);
  }
}
