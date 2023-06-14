import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1686654806900 implements MigrationInterface {
  name = 'User1686654806900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."role_enum" AS ENUM('user', 'admin', 'boss')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."role_enum" NOT NULL DEFAULT 'user', "email" text NOT NULL, "passwordHash" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "homeAddress" text, "phoneNumber" text, "birthdate" text, "createdAt" text NOT NULL DEFAULT now(), "updatedAt" text NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."role_enum"`);
  }
}
