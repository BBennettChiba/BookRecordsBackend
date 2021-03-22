import {MigrationInterface, QueryRunner} from "typeorm";

export class new1616401360306 implements MigrationInterface {
    name = 'new1616401360306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "password" ADD CONSTRAINT "UQ_dc877602e08545367e6f85b02e5" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "password" ADD CONSTRAINT "FK_dc877602e08545367e6f85b02e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password" DROP CONSTRAINT "FK_dc877602e08545367e6f85b02e5"`);
        await queryRunner.query(`ALTER TABLE "password" DROP CONSTRAINT "UQ_dc877602e08545367e6f85b02e5"`);
        await queryRunner.query(`ALTER TABLE "password" DROP COLUMN "userId"`);
    }

}
