import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI!);
        const connection = mongoose.connection;
        connection.on("connection", () => {
            console.log("connected to database");
        })
        connection.on("error", (err) => {
            console.log("Error while connecting to database plz make sure db is up and running: "+err);  
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong while connecting to database",error);
    }
}