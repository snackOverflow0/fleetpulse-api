import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateHubDto {
  @IsString()
  @IsNotEmpty({ message: 'Name of hub/warehouse cannot be empty.' })
  name!: string

  @IsUUID(4, { message: 'Parent companyId should be a valid UUID string.' })
  @IsNotEmpty()
  companyId!: string

  @IsUUID(4, { message: 'Assigned managerId should be a valid UUID string.' })
  @IsOptional()
  managerId?: string
}