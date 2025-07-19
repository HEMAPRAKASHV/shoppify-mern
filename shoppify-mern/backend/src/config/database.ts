import mongoose from "mongoose"
import { env_config } from '../config/environment'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env_config.mongoUrl,
            {
                dbName: "shopping"
            }
        );
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting database",error)
    }
}

export default connectDB;