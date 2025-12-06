import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from 'src/db/entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private repo: Repository<TrackEntity>,
  ) {}

  getAllTracks() {
    return this.repo.find();
  }

  async getTrackById(id: string) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async createTrack(body: CreateTrackDto) {
    const track = this.repo.create({
      name: body.name,
      duration: body.duration,
      artistId: body.artistId ?? null,
      albumId: body.albumId ?? null,
    });

    return this.repo.save(track);
  }

  async updateTrackInfo(id: string, body: UpdateTrackDto) {
    const track = await this.repo.findOne({ where: { id } });
    if (!track) return null;

    if (body.name !== undefined) track.name = body.name;
    if (body.duration !== undefined) track.duration = body.duration;

    if (body.artistId !== undefined) track.artistId = body.artistId;
    if (body.albumId !== undefined) track.albumId = body.albumId;

    return this.repo.save(track);
  }

  async deleteTrack(id: string) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
