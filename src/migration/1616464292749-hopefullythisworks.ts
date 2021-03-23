import {MigrationInterface, QueryRunner} from "typeorm";

export class hopefullythisworks1616464292749 implements MigrationInterface {
    name = 'hopefullythisworks1616464292749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password" ("password" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_dc877602e08545367e6f85b02e" UNIQUE ("userId"), CONSTRAINT "PK_15d4f1cd6e0b148d2b968f55588" PRIMARY KEY ("password"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "userName" character varying(200) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "password" ADD CONSTRAINT "FK_dc877602e08545367e6f85b02e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
        await queryRunner.query(`ALTER TABLE "password" DROP CONSTRAINT "FK_dc877602e08545367e6f85b02e5"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "password"`);
    }

}
