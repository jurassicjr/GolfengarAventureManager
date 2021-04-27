import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddChannelInformationToAdventure1619559285991
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "adventures",
      new TableColumn({
        name: "channel_id",
        type: "varchar",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("adventures", "channel_id");
  }
}
