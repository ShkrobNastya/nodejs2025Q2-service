import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistEntity } from 'src/db/entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private repo: Repository<ArtistEntity>,
  ) {}

  getAllArtists() {
    return this.repo.find();
  }

  async getArtistById(id: string) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) return null;
    return artist;
  }

  createArtist(body: CreateArtistDto) {
    const artistPayload: Artist = {
      id: uuid(),
      name: body.name,
      grammy: body.grammy,
    };

    const newArtist = this.repo.create(artistPayload);

    return this.repo.save(newArtist);
  }

  async updateArtistInfo(id: string, body: UpdateArtistDto) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) return null;

    artist.name = body.name ?? artist.name;
    artist.grammy = body.grammy ?? artist.grammy;

    return this.repo.save(artist);
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
