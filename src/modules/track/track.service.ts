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
    const track = await this.repo.findOne({ where: { id } });
    if (!track) return null;
    return track;
  }

  createTrack(body: CreateTrackDto) {
    const trackPayload: Track = {
      id: uuid(),
      name: body.name,
      artistId: body.artistId ?? null,
      albumId: body.albumId ?? null,
      duration: body.duration,
    };

    const newTrack = this.repo.create(trackPayload);

    return this.repo.save(newTrack);
  }

  async updateTrackInfo(id: string, body: UpdateTrackDto) {
    const track = await this.repo.findOne({ where: { id } });
    if (!track) return null;

    track.name = body.name ?? track.name;
    track.artistId =
      body.artistId === undefined ? track.artistId : body.artistId;
    track.albumId = body.albumId === undefined ? track.albumId : body.albumId;
    track.duration = body.duration ?? track.duration;

    return this.repo.save(track);
  }

  async deleteTrack(id: string) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}
