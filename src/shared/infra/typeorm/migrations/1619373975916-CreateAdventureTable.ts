import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAdventureTable1619373975916
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adventures",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "dungeon_master",
            type: "varchar",
          },
          {
            name: "session_start_date",
            type: "timestamp",
          },
          {
            name: "participants",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "session_end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "xp_reward",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "gold_reward",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "rank",
            type: "varchar",
          },
          {
            name: "candidates",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "report",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "create_date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "update_date",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adventures");
  }
}
