import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Battery = db.define('battery', {
    tegangan:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    arus:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    daya:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    daya_digunakan:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    suhu:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    latitude:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    longitude:{
        type: DataTypes.STRING,
        // allowNull:false,
    },
    token_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tokens',
            key: 'id'
        }
    },
    remainingTime:{
        type: DataTypes.INTEGER,
        // allowNull:false,
    },
    status_relay:{
        type: DataTypes.BOOLEAN,
        // allowNull:false,
    },
    distanceTravelled :{
        type : DataTypes.FLOAT,
    },
    batteryPercentage :{
        type : DataTypes.FLOAT,
    },
    chargingStatus : {
        type : DataTypes.STRING
    }


},{
    freezeTableName:true
});

export default Battery;