import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const FAQ = db.define('faq', {
    question:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    answer:{
        type: DataTypes.STRING,
        allowNull:false,
    },

},{
    freezeTableName:true
});

export default FAQ;