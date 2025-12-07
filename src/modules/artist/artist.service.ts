import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
    const newArtist = this.repo.create({
      name: body.name,
      grammy: body.grammy,
    });

    return this.repo.save(newArtist);
  }

  async updateArtistInfo(id: string, body: UpdateArtistDto) {
    const artist = await this.repo.findOne({ where: { id } });
    if (!artist) return null;

    artist.name = body.name ?? artist.name;
    artist.grammy = body.grammy ?? artist.grammy;

    return this.repo.save(artist);
  }

  async deleteArtist(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);

    return result.affected > 0;
  }
}
