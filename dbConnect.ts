import mongoose from "mongoose";

//data base ke connection ke bad jo object return ho rha hai uska datatype define kr rhe hai
type ConnectionObject={
    isConnected? :number
}

const connection:ConnectionObject={}

async function dbConnect(): Promise<void>{

    //first of all we will check if the db is already connected in order to avoid database chocking( if we are connecting the database although we have made  the connection previously

  if(connection.isConnected){ 
    console.log("Already connected to database");
    return ;
  }

  try{
   const db= await mongoose.connect(process.env.MONGODB_URI || "" ,{} );

   connection.isConnected = db.connections[0].readyState  //connections array ki first value se ready state extract ki haii
   console.log("DB connected successfully");

  }catch(error){
    console.log("Database connection failed" ,error)
     process.exit(1); //process is being exit gracefully
     
  }
}

export default dbConnect;

//data base connection all time hai hi nhi
//jaise jaise request jati ha waise waise connection bnta hai