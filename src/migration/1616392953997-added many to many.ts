import {MigrationInterface, QueryRunner} from "typeorm";

export class addedManyToMany1616392953997 implements MigrationInterface {
    name = 'addedManyToMany1616392953997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password" ("password" character varying NOT NULL, CONSTRAINT "PK_15d4f1cd6e0b148d2b968f55588" PRIMARY KEY ("password"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "userName" character varying(200) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_books_book" ("userId" uuid NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_baef78b64f8672af581fb995802" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ad4911225f9d075e7af4dc2ced" ON "user_books_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17480627c54e46bc745098954e" ON "user_books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books_book" ADD CONSTRAINT "FK_ad4911225f9d075e7af4dc2cede" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books_book" ADD CONSTRAINT "FK_17480627c54e46bc745098954e3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books_book" DROP CONSTRAINT "FK_17480627c54e46bc745098954e3"`);
        await queryRunner.query(`ALTER TABLE "user_books_book" DROP CONSTRAINT "FK_ad4911225f9d075e7af4dc2cede"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
        await queryRunner.query(`DROP INDEX "IDX_17480627c54e46bc745098954e"`);
        await queryRunner.query(`DROP INDEX "IDX_ad4911225f9d075e7af4dc2ced"`);
        await queryRunner.query(`DROP TABLE "user_books_book"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "password"`);
    }

}
