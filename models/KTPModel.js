import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const KTP = db.define('ktp', {
    nik:{
        type: DataTypes.STRING,
        // allowNull:false,
        unique:true
    },
    nama:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    tanggal_lahir:{
        type: DataTypes.DATE,
        allowNull:false,
    }

},{
    freezeTableName:true
});

export default KTP;