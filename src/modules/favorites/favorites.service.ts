import { Injectable } from '@nestjs/common';
import { db } from '../../db/db';

@Injectable()
export class FavoritesService {
  getAllFavorites() {
    return {
      artists: db.favorites.artists
        .map((id) => db.artists.find((artist) => artist.id === id))
        .filter(Boolean),
      albums: db.favorites.albums
        .map((id) => db.albums.find((album) => album.id === id))
        .filter(Boolean),
      tracks: db.favorites.tracks
        .map((id) => db.tracks.find((track) => track.id === id))
        .filter(Boolean),
    };
  }

  addTrackToFavorites(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return false;

    if (!db.favorites.tracks.includes(id)) {
      db.favorites.tracks.push(id);
    }
    return true;
  }

  deleteTrackFromFavorites(id: string) {
    const index = db.favorites.tracks.indexOf(id);
    if (index === -1) return false;

    db.favorites.tracks.splice(index, 1);
    return true;
  }

  addAlbumToFavorites(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return false;

    if (!db.favorites.albums.includes(id)) {
      db.favorites.albums.push(id);
    }
    return true;
  }

  deleteAlbumFromFavorites(id: string) {
    const index = db.favorites.albums.indexOf(id);
    if (index === -1) return false;

    db.favorites.albums.splice(index, 1);
    return true;
  }

  addArtistToFavorites(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return false;

    if (!db.favorites.artists.includes(id)) {
      db.favorites.artists.push(id);
    }
    return true;
  }

  deleteArtistFromFavorites(id: string) {
    const index = db.favorites.artists.indexOf(id);
    if (index === -1) return false;

    db.favorites.artists.splice(index, 1);
    return true;
  }
}
