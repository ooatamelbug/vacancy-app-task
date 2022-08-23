import ObjectIDExtende from "../../shared/dto/shared.dto";
import { Column, Entity } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";

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
}

export default Company;