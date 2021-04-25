import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAdventureTable1619373975916
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "aventures",
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
          },
          {
            name: "session_end_date",
            type: "timestamp",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "xp_reward",
            type: "varchar",
          },
          {
            name: "gold_reward",
            type: "varchar",
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
