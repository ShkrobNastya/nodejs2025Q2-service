import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from './track.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'favorites_artists' })
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'favorites_albums' })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'favorites_tracks' })
  tracks: TrackEntity[];
}
