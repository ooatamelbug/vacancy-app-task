import ObjectIDExtende from "../../shared/dto/shared.dto";
import { Column, Entity, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import Company from "../../company/entity/company";

class JobDay {
   @IsOptional()
   date: string;
   @IsOptional()
   numb: number; 
}

@Entity()
class User extends ObjectIDExtende {
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
   jobInDay: [JobDay]

   @OneToMany(type => Company, company => company.user)
   companies: Company[];
}

export default User;