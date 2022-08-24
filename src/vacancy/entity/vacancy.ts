import ObjectIDExtende from "../../shared/dto/shared.dto";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Generated
} from "typeorm";
import { ObjectID } from "mongodb";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import Company from "../../company/entity/company";
import {User} from "../../users/entity/user";

export class JobApplicants {
    @Column({nullable: false})
    id: ObjectID

    @Column({ type: 'timestamp' })
    timeApply: Date;
}

@Entity()
class Vacancy extends ObjectIDExtende {
  @IsNotEmpty()
  @Column()
  postionTitle: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @Column()
  requiredOfYearsExperience: number;

  
  @Column()
  uuid: string;

  @Column({ default: "OPEN" })
  status: string;

  @ManyToOne(() => Company, (company) => company.vacancies)
  company: Company;

  @Column(() => JobApplicants)
  jobApplicants: [JobApplicants];

  @Column({ nullable: true })
  public created_by: ObjectID;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}

export default Vacancy;
