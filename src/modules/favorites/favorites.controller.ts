import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.favoritesService.addTrackToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    return { message: 'Track added to favorites successfully' };
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.favoritesService.deleteTrackFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Track is not found');
    }
  }

  @Post('/album/:id')
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.favoritesService.addAlbumToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    return { message: 'Album added to favorites successfully' };
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.favoritesService.deleteAlbumFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Album is not found');
    }
  }

  @Post('/artist/:id')
  async addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.favoritesService.addArtistToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    return { message: 'Artist added to favorites successfully' };
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const result = await this.favoritesService.deleteArtistFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
  }
}
