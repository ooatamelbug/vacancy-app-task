import ObjectIDExtende from "../../shared/dto/shared.dto";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import User from "../../users/entity/user";

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

   @ManyToOne(type => User, user => user.companies)
   user: User
}

export default Company;