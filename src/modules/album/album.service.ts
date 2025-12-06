import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from 'src/db/entities/album.entity';
import { ArtistEntity } from 'src/db/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private repo: Repository<AlbumEntity>,
  ) {}

  getAllAlbums() {
    return this.repo.find();
  }

  async getAlbumById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async createAlbum(body: CreateAlbumDto) {
    const album = this.repo.create({
      name: body.name,
      year: body.year,
      artistId: body.artistId ?? null,
    });

    if (body.artistId) {
      album.artist = { id: body.artistId } as ArtistEntity;
    }

    return this.repo.save(album);
  }

  async updateAlbumInfo(id: string, body: UpdateAlbumDto) {
    const album = await this.repo.findOne({ where: { id } });
    if (!album) return null;

    album.name = body.name ?? album.name;
    album.year = body.year ?? album.year;

    if (body.artistId !== undefined) {
      album.artistId = body.artistId;
      album.artist =
        body.artistId === null ? null : ({ id: body.artistId } as ArtistEntity);
    }

    return this.repo.save(album);
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
