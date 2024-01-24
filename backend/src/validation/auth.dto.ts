import {
  IsString,
  IsUUID,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsJWT,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUp {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly login: string;
}

export class SignUpResponse {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly login: string;
}

export class SignIn {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}

export class SignInResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  readonly accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly accessTokenExpires: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly updatedAt: Date;
}

export class RefreshToken {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  readonly accessToken: string;
}
