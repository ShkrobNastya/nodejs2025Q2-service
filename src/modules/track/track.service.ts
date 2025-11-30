import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { db } from '../../db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  getAllTracks() {
    return db.tracks;
  }

  getTrackById(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return null;
    return track;
  }

  createTrack(body: CreateTrackDto) {
    const newTrack: Track = {
      id: uuid(),
      name: body.name,
      artistId: body.artistId ?? null,
      albumId: body.albumId ?? null,
      duration: body.duration,
    };

    db.tracks.push(newTrack);
    return newTrack;
  }

  updateTrackInfo(id: string, body: UpdateTrackDto) {
    const track = db.tracks.find((track) => track.id === id);
    if (!track) return null;

    track.name = body.name ?? track.name;
    track.artistId =
      body.artistId === undefined ? track.artistId : body.artistId;
    track.albumId = body.albumId === undefined ? track.albumId : body.albumId;
    track.duration = body.duration ?? track.duration;

    return track;
  }

  deleteTrack(id: string) {
    const index = db.tracks.findIndex((track) => track.id === id);
    if (index === -1) return false;

    db.tracks.splice(index, 1);
    return true;
  }
}
