import { IsNotEmpty, IsString, IsUUID, IsOptional, IsIn } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty({ message: 'The tracking number of package barcode cannot be empty.' })
  trackingNo!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name of recipient cannot be empty.' })
  recipient!: string;

  @IsUUID(4)
  @IsNotEmpty()
  hubId!: string; // The starting distribution source point of the parcel
}

export class UpdateShipmentStatusDto {
  @IsString()
  @IsIn(['MANIFESTED', 'IN_TRANSIT', 'DELIVERED', 'FAILED'], { message: 'Maling shipment state transition option.' })
  status!: string;

  @IsUUID(4)
  @IsOptional()
  vehicleId?: string; // Driver can map what vehicle container currently holds the package during transit
}