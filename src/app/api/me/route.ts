import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { auth } from "@/auth";
import ConnectDB from "@/db/db";


export const GET = async (req:NextRequest, res:NextResponse) => {

  const session = await auth()

const username = session?.user?.name
const email = session?.user?.email
if(!username || !email){
  return new NextResponse(
    JSON.stringify({
      status: "failed",
      message: "You are not authorized to access this page",
    }),
    {
      status: 404,
    }
  )
}


await ConnectDB()

try {
  const findUser = await User.findOne({ email})

  if(!findUser){
    return new NextResponse(JSON.stringify({
      status: "failed",
      message: "No user found"
    }), {status: 401})
  }


  return new NextResponse(JSON.stringify({
    status: "success",
    data:findUser
  }), {status: 500})
  
} catch (error) {
  return new NextResponse(JSON.stringify({
    status: "failed",
    message: "Something went wrong"
  }), {status: 500})
}

}
