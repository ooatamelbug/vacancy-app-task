import ObjectIDExtende from "../../shared/dto/shared.dto";
import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import Vacancy from "../../vacancy/entity/vacancy";

export class JobDay {
  @IsOptional()
  date: Date;

  @IsOptional()
  numb: number;
}

@Entity()
export class User extends ObjectIDExtende {
  @IsNotEmpty()
  @Column()
  firsname: string;

  @IsNotEmpty()
  @Column()
  lastname: string;

  @IsEmail()
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @IsOptional()
  @Column()
  jobInDay: [JobDay];

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.jobApplicants)
  jobVacancy: Vacancy;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
