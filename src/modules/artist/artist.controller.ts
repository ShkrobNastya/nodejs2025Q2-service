import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put('/:id')
  updateArtistInfo(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.updateArtistInfo(id, dto);
  }

  @Delete('/:id')
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
