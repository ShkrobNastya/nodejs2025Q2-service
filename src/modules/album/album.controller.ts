import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get('/:id')
  getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put('/:id')
  updateAlbumInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    const result = this.albumService.updateAlbumInfo(id, dto);
    if (!result) {
      throw new NotFoundException('Album not found');
    }
    return result;
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.deleteAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
