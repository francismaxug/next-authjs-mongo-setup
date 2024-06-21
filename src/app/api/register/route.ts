import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import ConnectDB from "@/db/db"

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { name, email, password } = await req.json()
  console.log(name)

  try {
    ConnectDB()

    const userExist = await User.findOne({ email })
    if (userExist) {
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "user already exist",
        }),
        {
          status: 400,
        }
      )
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const createdUser = new User({
      name,
      email,
      password: hashPassword,
    })

    await createdUser.save()
    return new NextResponse(
      JSON.stringify({
        name: createdUser.name,
        email: createdUser.email,
      }),
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "something went wrong",
      }),
      {
        status: 500,
      }
    )
  }
}
