import ObjectIDExtende from "../../shared/dto/shared.dto";
import { Column, Entity } from "typeorm";

@Entity()
class User extends ObjectIDExtende {
   @Column()
   firsname: string;

   @Column()
   lastname: string;

   @Column()
   email: string;

   @Column()
   password: string;
}

export default User;