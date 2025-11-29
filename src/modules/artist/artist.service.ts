import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return db.artists;
  }

  getArtistById(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return null;
    return artist;
  }

  createArtist(body: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuid(),
      name: body.name,
      grammy: body.grammy,
    };

    db.artists.push(newArtist);
    return newArtist;
  }

  updateArtistInfo(id: string, body: UpdateArtistDto) {
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) return null;

    artist.name = body.name ?? artist.name;
    artist.grammy = body.grammy ?? artist.grammy;

    return artist;
  }

  deleteArtist(id: string) {
    const index = db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) return false;

    db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    db.artists.splice(index, 1);
    return true;
  }
}
