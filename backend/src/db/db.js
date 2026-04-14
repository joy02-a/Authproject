import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.URI);
        console.log("MONGODB CONNECTED:", connect.connection.host);
    } catch (error) {
        console.log("Error connecting to MONGODB", error);
    }
}