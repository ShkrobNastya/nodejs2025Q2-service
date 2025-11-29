import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
