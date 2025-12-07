import { DataSource } from 'typeorm';
import { UserEntity } from './db/entities/user.entity';
import { TrackEntity } from './db/entities/track.entity';
import { ArtistEntity } from './db/entities/artist.entity';
import { AlbumEntity } from './db/entities/album.entity';
import { FavoritesEntity } from './db/entities/favourites.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const isCompiled = __filename.endsWith('.js');
const migrationsPath = isCompiled
  ? [path.join(__dirname, 'migration', '*.js')]
  : [path.join(__dirname, 'migration', '*.ts')];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [
    UserEntity,
    TrackEntity,
    ArtistEntity,
    AlbumEntity,
    FavoritesEntity,
  ],
  migrations: migrationsPath,
  synchronize: false,
  migrationsRun: false,
});
