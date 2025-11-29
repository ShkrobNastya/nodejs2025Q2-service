import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
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
  getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put('/:id')
  updateArtistInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const result = this.artistService.updateArtistInfo(id, dto);
    if (!result) {
      throw new NotFoundException('Artist not found');
    }
    return result;
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.deleteArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
