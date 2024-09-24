import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) {
    return;
  }

  const db = await connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/trancas-aus-78"
  );
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb CONECTADO*** to db"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));






/*

export async function connect(){
    try{
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log(" MongoDB conectado")
        })
        connection.on('error',(err)=>{
            console.log(" MongoDB error")
            process.exit();
        })

    }catch(error){
        console.log(" MongoDB error!")
        console.log(error)
  

    }
}*/