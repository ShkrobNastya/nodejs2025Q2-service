import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1765122206383 implements MigrationInterface {
    name = 'InitDatabase1765122206383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists" ("favoritesId" uuid NOT NULL, "artistEntityId" uuid NOT NULL, CONSTRAINT "PK_c7e474f2ed06dedfb02bf4abea0" PRIMARY KEY ("favoritesId", "artistEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f63a65b7c5ccd375222059b99d" ON "favorites_artists" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3347cbaa10ea56034e6c3dbc75" ON "favorites_artists" ("artistEntityId") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums" ("favoritesId" uuid NOT NULL, "albumEntityId" uuid NOT NULL, CONSTRAINT "PK_29a1218277d7f23257145780f9d" PRIMARY KEY ("favoritesId", "albumEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_742c8c8695facaa53dac91dcb0" ON "favorites_albums" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b62ca2ed9a4efd2ca68fb48efa" ON "favorites_albums" ("albumEntityId") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks" ("favoritesId" uuid NOT NULL, "trackEntityId" uuid NOT NULL, CONSTRAINT "PK_25c404c3449254051129a04dfad" PRIMARY KEY ("favoritesId", "trackEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b8670610383af0d4c3614607ad" ON "favorites_tracks" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a1200b4c857e8034163b4b2ef" ON "favorites_tracks" ("trackEntityId") `);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_f63a65b7c5ccd375222059b99d4" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_3347cbaa10ea56034e6c3dbc754" FOREIGN KEY ("artistEntityId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_742c8c8695facaa53dac91dcb07" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_b62ca2ed9a4efd2ca68fb48efae" FOREIGN KEY ("albumEntityId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_b8670610383af0d4c3614607adf" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_2a1200b4c857e8034163b4b2efd" FOREIGN KEY ("trackEntityId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_2a1200b4c857e8034163b4b2efd"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_b8670610383af0d4c3614607adf"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_b62ca2ed9a4efd2ca68fb48efae"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_742c8c8695facaa53dac91dcb07"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_3347cbaa10ea56034e6c3dbc754"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_f63a65b7c5ccd375222059b99d4"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`);
        await queryRunner.query(`ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a1200b4c857e8034163b4b2ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b8670610383af0d4c3614607ad"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b62ca2ed9a4efd2ca68fb48efa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_742c8c8695facaa53dac91dcb0"`);
        await queryRunner.query(`DROP TABLE "favorites_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3347cbaa10ea56034e6c3dbc75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f63a65b7c5ccd375222059b99d"`);
        await queryRunner.query(`DROP TABLE "favorites_artists"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "track_entity"`);
        await queryRunner.query(`DROP TABLE "artist_entity"`);
        await queryRunner.query(`DROP TABLE "album_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
