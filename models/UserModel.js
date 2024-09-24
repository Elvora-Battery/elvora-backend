import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type: DataTypes.STRING,
    },
    level:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    otp_code:{
        type: DataTypes.STRING,
    },
    otp_verify:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ktp_id:{
        type: DataTypes.INTEGER,
        allowNull:true,
        references: {
            model: 'ktp',
            key: 'id'
        }
    }

},{
    freezeTableName:true
});

export default Users;