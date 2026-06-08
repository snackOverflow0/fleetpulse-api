import { IsNotEmpty, IsString, IsUUID, IsIn, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty({ message: 'Plate number cannot be empty.' })
  plateNo!: string;

  @IsString()
  @IsIn(['TRUCK', 'VAN', 'MOTORCYCLE'], { message: 'Wrong type of vehicle. Choose: TRUCK, VAN, or MOTORCYCLE.' })
  type!: string;

  @IsUUID(4, { message: 'hubId should be a valid UUID string.' })
  @IsNotEmpty()
  hubId!: string; // The physical warehouse base of this transport vehicle

  @IsUUID(4, { message: 'driverId should be a valid UUID string.' })
  @IsOptional()
  driverId?: string; // Optional: A vehicle can be idle in the parking lot without an active driver assigned
}