import RentTransaction from '../../models/RentTransactionModel.js';
import client from '../../config/mqttClient.js';
import Battery from '../../models/BatteryModel.js'
import { Token } from '../../models/TokenModel.js';
import Users from '../../models/UserModel.js';

// Subscribe ke topik token
client.subscribe('FourDayTeam/output/BatteryConditions', (err) => {
    if (err) {
        console.error('Failed to subscribe to token topic:', err);
    } else {
        console.log('Subscribed to token topic');
    }
});

// Subscribe ke topik baterai
client.subscribe("FourDayTeam/output/BatteryStatus", (err) => {
    if (err) {
        console.error('Failed to subscribe to battery topic:', err);
    } else {
        console.log('Subscribed to battery topic');
    }
});

// Mengolah data yang diterima dari topik : ini masih belum tau ngambil id tokennya dimana
//ambil data id token : cari di tabel transaksi
client.on('message', async (topic, message) => {
    const data = message.toString();
    if (topic === 'FourDayTeam/output/BatteryStatus') {
        const { remainingTime, relayStatus, latitude, longitude, token_data } = JSON.parse(data);
        console.log(`Received token data: Total waktu: ${remainingTime}, Status relay: ${relayStatus}`);
        const token = await Token.findOne({
            where :{token : token_data},
            attributes :["id"]
        })
        console.log(token.id);
        if(!token){
            console.log("Token is not valid");
            return;
        }
        // const battery_token = await Battery.findOne({
        //     where: {token_id : token.id}
        // })
        // if(!battery_token){
            await Battery.create({
                total_waktu :remainingTime,
                status_relay : relayStatus,
                latitude :latitude,
                longitude : longitude,
                token_id : token.id
            });
        // }else{
        //     battery_token.total_waktu = remainingTime,
        //     battery_token.status_relay =relayStatus,
        //     battery_token.latitude = latitude,
        //     battery_token.longitude = longitude,
        //     await battery_token.save();
        // }

        
    }

    if (topic === 'FourDayTeam/output/BatteryConditions') {
        const { Voltage, Current, PowerNow, PowerUsed, Temperature, token_data, remainingTime, relayStatus, latitude, longitude } = JSON.parse(data);
        console.log(`Received battery data: Tegangan: ${Voltage}, Arus: ${Current}, Daya: ${PowerNow}, Daya yang digunakan :${PowerUsed} Suhu: ${Temperature}`);
        const token = await Token.findOne({
            where :{token : token_data},
            attributes :["id"]
        })
        if(!token){
            console.log("Token is not valid");
            return;
        }
            
        const battery_token = await Battery.findOne({
            where: {token_id : token.id}
        })
        
        if(!battery_token){
            // Simpan ke database MySQL
            await Battery.create({
                tegangan :Voltage,
                arus : Current,
                daya :PowerNow,
                daya_digunakan : PowerUsed,
                suhu : Temperature,
                total_waktu :remainingTime,
                status_relay : relayStatus,
                latitude :latitude,
                longitude : longitude,
                token_id : token.id
            })
        }else{
            battery_token.tegangan = Voltage,
            battery_token.arus = Current,
            battery_token.daya =PowerNow,
            battery_token.daya_digunakan = PowerUsed,
            battery_token.suhu = Temperature,
            battery_token.total_waktu =remainingTime,
            battery_token.status_relay = relayStatus,
            battery_token.latitude =latitude,
            battery_token.longitude = longitude,
            await battery_token.save();
        }

        
    }
});

// Fungsi untuk publish data token ke topik token
export const publishTokenValue = async (token) => {
    const message = JSON.stringify(token);
    const token_data  = await Token.findOne({
        where :{token : token}
    })
    if (!token_data){
        throw new Error("Token is invalid");
    }
    const transaction = await RentTransaction.findOne({
        where :{token_id : token_data.id}
    })
    transaction.status = "Active";
    transaction.save();
    client.publish('FourDayTeam/input/token', message, (err) => {
        if (err) {
            console.error('Failed to publish token value:', err);
        } else {
            console.log('Published token value:', message);
        }
    });
};


