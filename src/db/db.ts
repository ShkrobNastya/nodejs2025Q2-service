import { User } from '../modules/user/entities/user.entity';
import { Track } from '../modules/track/entities/track.entity';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Album } from 'src/modules/album/entities/album.entity';
import { Favorites } from 'src/modules/favorites/entities/favorites.entity';

class DB {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];

  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

export const db = new DB();
