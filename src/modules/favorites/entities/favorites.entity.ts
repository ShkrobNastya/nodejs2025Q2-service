import { ArtistEntity } from '../../../db/entities/artist.entity';
import { AlbumEntity } from '../../../db/entities/album.entity';
import { TrackEntity } from '../../../db/entities/track.entity';

export class Favorites {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
