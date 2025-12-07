import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../../db/entities/favourites.entity';
import { ArtistEntity } from '../../db/entities/artist.entity';
import { AlbumEntity } from '../../db/entities/album.entity';
import { TrackEntity } from '../../db/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepo: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepo: Repository<TrackEntity>,
  ) {}

  private async getFavorites(): Promise<FavoritesEntity> {
    let favorites = await this.favoritesRepo.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorites) {
      favorites = this.favoritesRepo.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      favorites = await this.favoritesRepo.save(favorites);
    }

    return favorites;
  }

  async getAllFavorites() {
    const favorites = await this.getFavorites();
    return {
      artists: favorites.artists || [],
      albums: favorites.albums || [],
      tracks: favorites.tracks || [],
    };
  }

  async addTrackToFavorites(id: string) {
    const track = await this.trackRepo.findOne({ where: { id } });
    if (!track) return false;

    const favorites = await this.getFavorites();

    if (!favorites.tracks.some((track) => track.id === id)) {
      favorites.tracks.push(track);
      await this.favoritesRepo.save(favorites);
    }
    return true;
  }

  async deleteTrackFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const length = favorites.tracks.length;

    favorites.tracks = favorites.tracks.filter((track) => track.id !== id);

    if (favorites.tracks.length === length) {
      return false;
    }

    await this.favoritesRepo.save(favorites);
    return true;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumRepo.findOne({ where: { id } });
    if (!album) return false;

    const favorites = await this.getFavorites();

    if (!favorites.albums.some((album) => album.id === id)) {
      favorites.albums.push(album);
      await this.favoritesRepo.save(favorites);
    }
    return true;
  }

  async deleteAlbumFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const length = favorites.albums.length;

    favorites.albums = favorites.albums.filter((album) => album.id !== id);

    if (favorites.albums.length === length) {
      return false;
    }

    await this.favoritesRepo.save(favorites);
    return true;
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistRepo.findOne({ where: { id } });
    if (!artist) return false;

    const favorites = await this.getFavorites();

    if (!favorites.artists.some((artist) => artist.id === id)) {
      favorites.artists.push(artist);
      await this.favoritesRepo.save(favorites);
    }
    return true;
  }

  async deleteArtistFromFavorites(id: string) {
    const favorites = await this.getFavorites();
    const length = favorites.artists.length;

    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);

    if (favorites.artists.length === length) {
      return false;
    }

    await this.favoritesRepo.save(favorites);
    return true;
  }
}
