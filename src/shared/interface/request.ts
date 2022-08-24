import { Request } from "express";
import { ObjectID } from "typeorm";

export interface CustomRequest extends Request {
    user?: any | ObjectID;
}