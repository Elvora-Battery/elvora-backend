import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { RentType } from "./RentTypeModel.js";

const { DataTypes } = Sequelize;

const RentTransaction = db.define('rent_transactions', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    rent_type_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rent_types',
            key: 'id'
        }
    },
    contract_file:{
        type: DataTypes.STRING,
    },
    battery_name:{
        type: DataTypes.STRING,
    },
    expiration_date:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    shipping_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'shipping_details',
            key: 'id'
        }
    },
    payment:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    },
    token_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tokens',
            key: 'id'
        }
    },
    battery_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'battery',
            key: 'id'
        }
    },
    isDefault : {
        type : DataTypes.BOOLEAN,
        allowNull : true
    }

},{
    freezeTableName:true
});


export default RentTransaction;