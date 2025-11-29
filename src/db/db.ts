import { User } from '../modules/user/entities/user.entity';
import { Track } from '../modules/track/entities/track.entity';

class DB {
  users: User[] = [];
  tracks: Track[] = [];
}

export const db = new DB();
