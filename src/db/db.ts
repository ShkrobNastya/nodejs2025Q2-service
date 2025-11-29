import { User } from '../modules/user/entities/user.entity';
import { Track } from '../modules/track/entities/track.entity';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Album } from 'src/modules/album/entities/album.entity';

class DB {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}

export const db = new DB();
