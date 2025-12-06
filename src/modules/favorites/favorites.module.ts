import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesEntity } from '../../db/entities/favourites.entity';
import { ArtistEntity } from '../../db/entities/artist.entity';
import { AlbumEntity } from '../../db/entities/album.entity';
import { TrackEntity } from '../../db/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
