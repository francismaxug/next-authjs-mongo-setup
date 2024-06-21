import mongoose from "mongoose"

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING!)

    console.log("MongoDB Connected")
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
  }
}

export default ConnectDB  
