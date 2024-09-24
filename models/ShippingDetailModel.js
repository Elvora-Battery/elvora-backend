import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ShippingDetail = db.define('shipping_details', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    street_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    village:{
        type:DataTypes.STRING,
        allowNull:false
    },
    full_address:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    freezeTableName:true
});

export { ShippingDetail };