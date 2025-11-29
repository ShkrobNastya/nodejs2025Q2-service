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
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addTrackToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    return result;
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.deleteTrackFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Track is not found');
    }
  }

  @Post('/album/:id')
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addAlbumToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    return result;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.deleteAlbumFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Album is not found');
    }
  }

  @Post('/artist/:id')
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.addArtistToFavorites(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    return result;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favoritesService.deleteArtistFromFavorites(id);

    if (!result) {
      throw new NotFoundException('Artist is not found');
    }
  }
}
