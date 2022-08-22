import { Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
class ObjectIDExtende {
    @ObjectIdColumn()
    id: ObjectID;
}

export default ObjectIDExtende;