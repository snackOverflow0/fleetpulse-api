import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(100, { message: 'The name of the company must be at least 100 characters long.' })
  name!: string;
}