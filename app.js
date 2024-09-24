import express from "express";
import db from "./config/database.js"
import dotenv from "dotenv";
import userRouter from "./backend/users/user.router.js";
import authRouter from "./backend/auth/auth.router.js";
import RentTypeRouter from "./backend/rent_type/rent_type.router.js"
import ShippingDetailRouter from "./backend/shipping/shipping.router.js"
import RentTransactionRouter from "./backend/rent_transaction/rent_transaction.router.js"
import MqttRouter from "./backend/mqtt/mqtt.router.js"
import KTPRouter from "./backend/ktp/ktp.router.js";
import { KTP, RentType, Users, RentTransaction, ShippingDetail, Token, Battery } from "./models/index.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/", authRouter);
app.use("/rent-type", RentTypeRouter);
app.use("/shipping", ShippingDetailRouter);
app.use("/ktp", KTPRouter);
app.use("/transaction", RentTransactionRouter);
app.use("/mqtt", MqttRouter);

const startServer = async ()=>{
  try {
    await db.authenticate();
    console.log('Database connected');
    // await db.sync();

  } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
  }


  const APP_PORT = process.env.APP_PORT || 8080;
  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
};

startServer();
