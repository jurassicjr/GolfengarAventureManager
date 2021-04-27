import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "adventures" })
export default class Adventure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ name: "dungeon_master" })
  dungeonMaster: string;

  @Column({ name: "session_start_date" })
  sessionStartDate: Date;

  @Column({ name: "session_end_date" })
  sessionEndDate: Date;

  @Column("simple-array")
  participants: string[];

  @Column("simple-array")
  candidates: string[];

  @Column()
  rank: string;

  @Column()
  description: string;

  @Column({ name: "number_of_vacancies" })
  numberOfVacancies: number;

  @Column({ name: "players_log", type: "simple-array" })
  playersLog: string[];

  @Column({ name: "xp_reward" })
  XPReward: number;

  @Column({ name: "gold_reward" })
  goldReward: string;

  @Column({ length: 2054 })
  report: string;

  @Column({ name: "channel_id" })
  channelID: string;

  @CreateDateColumn({ name: "create_date" })
  createDate: Date;

  @UpdateDateColumn({ name: "update_date" })
  updateDate: Date;
}
