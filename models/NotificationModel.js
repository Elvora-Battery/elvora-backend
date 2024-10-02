import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notification = db.define('notifications', {
    title:{
        type: DataTypes.STRING,
    },
    content:{
        type: DataTypes.STRING,
    },
    rent_transaction_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'rent_transactions',
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    date :{
        type : DataTypes.DATE
    },
    isOpen :{
        type : DataTypes.BOOLEAN
    },
    label :{
        type : DataTypes.STRING
    }

},{
    freezeTableName:true
});


export { Notification };