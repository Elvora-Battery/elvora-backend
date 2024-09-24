import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Token = db.define('tokens', {
    token:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
    }

},{
    freezeTableName:true
});

export { Token };