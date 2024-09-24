import { Sequelize } from "sequelize";
import db from "../config/database.js";
import RentTransaction from "./RentTransactionModel.js";

const { DataTypes } = Sequelize;

const RentType = db.define('rent_types', {
    rent_period:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    capacity:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    freezeTableName:true
});


export { RentType };