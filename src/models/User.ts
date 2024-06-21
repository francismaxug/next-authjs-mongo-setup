import { IUserModel, IUserSchema } from "@/lib/types"
import { Schema, model, models } from "mongoose"

const UserSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = models.User || model<IUserSchema | IUserModel>("User", UserSchema)
export default User
