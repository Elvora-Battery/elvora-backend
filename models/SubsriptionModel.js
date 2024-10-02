import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Subscription = db.define('subscriptions', {
    battery_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'battery',
            key: 'id'
        }
    },
    rent_transaction_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'rent_transactions',
            key: 'id'
        }
    },
    expirationDate :{
        type : DataTypes.DATE
    }

},{
    freezeTableName:true
});

export { Subscription };