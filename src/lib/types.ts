import { Model, Types, Document } from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface IUserModel extends Model<IUserSchema> {}
