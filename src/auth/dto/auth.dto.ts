import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Wrong email format. Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password!: string;

  @IsString()
  @IsOptional()
  @IsIn(['ADMIN', 'HUB_MANAGER', 'DRIVER', 'OPERATOR'], { message: 'Wrong role option.' })
  role?: string; // Optional: Default configuration is "OPERATOR"
}

export class LoginDto {
  @IsEmail({}, { message: 'Wrong email format. Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password!: string;
}