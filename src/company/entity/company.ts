import ObjectIDExtende from "../../shared/dto/shared.dto";
import {
  Column,
  Entity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { ObjectID } from "mongodb";
import { IsEmail, IsNotEmpty } from "class-validator";
import Vacancy from "../../vacancy/entity/vacancy";

@Entity()
class Company extends ObjectIDExtende {
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsEmail()
  @Column()
  email: string;

  @Column({ nullable: true })
  public userBy: ObjectID;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  vacancies: Vacancy[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}

export default Company;
