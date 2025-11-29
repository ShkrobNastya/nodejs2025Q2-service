import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  getAllAlbums() {
    return db.albums;
  }

  getAlbumById(id: string) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return null;
    return album;
  }

  createAlbum(body: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuid(),
      name: body.name,
      year: body.year,
      artistId: body.artistId ?? null,
    };

    db.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbumInfo(id: string, body: UpdateAlbumDto) {
    const album = db.albums.find((album) => album.id === id);
    if (!album) return null;

    album.name = body.name ?? album.name;
    album.artistId =
      body.artistId === undefined ? album.artistId : body.artistId;
    album.year = body.year ?? album.year;

    return album;
  }

  deleteAlbum(id: string) {
    const index = db.albums.findIndex((album) => album.id === id);
    if (index === -1) return false;

    db.albums.splice(index, 1);
    return true;
  }
}
