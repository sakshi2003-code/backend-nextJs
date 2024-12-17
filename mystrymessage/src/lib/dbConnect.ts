import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject={
    // typeScript
    isConnected?:number
}

const connection :ConnectionObject={}

// db connection m time lgta h isliye async
// yha promise ka type void ka mtlb h koi b datatype aa skta h

// crate .env file
async function dbConnect():Promise<void>{

    if(connection.isConnected){
        console.log("Already connected to database");
        return 
        
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || "",{})
        console.log(db);
       connection.isConnected= db.connections[0].readyState
       console.log("DB Connected Successfully");
       
        


    } catch (error) {
        console.log("DB Connection failed" ,error)
        process.exit(1)
    }

}

export default  dbConnect;