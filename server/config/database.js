import mongoose from "mongoose";
import { config } from "dotenv";
config();

const mongodbConnect = () => {
     const local_db = process.env.MONGODB_URL;
     const cloud_db = process.env.CONNECT_DB;

     mongoose
          .connect(local_db || cloud_db, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          })
          .then((data) => {
               console.log(`Mongodb connection is successfull ${data.connection.host}`);
          })
          .catch((err) => {
               console.log(`Mongodb connection is faild ${err.message}`);
               process.exit(1);
          });
};
export default mongodbConnect;
