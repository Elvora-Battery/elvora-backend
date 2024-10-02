import RentTransaction from '../../models/RentTransactionModel.js';
import client from '../../config/mqttClient.js';
import Battery from '../../models/BatteryModel.js'
import { Token } from '../../models/TokenModel.js';
import { Subscription } from '../../models/SubsriptionModel.js';
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
    let expiration_date
    let transaction
    if (topic === 'FourDayTeam/output/BatteryConditions') {
        const { Voltage, Current, PowerNow, PowerUsed, Temperature, token_data, remainingTime, relayStatus, latitude, longitude, DistanceTravelled, BatteryPercentage, ChargingStatus } = JSON.parse(data);
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

        transaction = await RentTransaction.findOne({
            where :{battery_id : battery_token.id}
        })

        const current_date = new Date();

        // Konversi remainingTime dari detik ke milidetik
        const remainingTimeInMilliseconds = remainingTime * 1000;
        
        // Hitung expiration_date dengan menambahkan waktu sisa ke current_date
        const expiration_date = new Date(current_date.getTime() + remainingTimeInMilliseconds);

        if (remainingTime == 2592000){
            await Subscription.create({
                battery_id : battery_token.id,
                rent_transaction_id : transaction.id,
                expirationDate : expiration_date
            })
        }
        

        // await Subscription.create({
        //     battery_id : battery_token.id,
        //     rent_transaction_id : transaction.id,
        //     expirationDate : expiration_date
        // })
        
        if(!battery_token){
            // Simpan ke database MySQL
            await Battery.create({
                tegangan :Voltage,
                arus : Current,
                daya :PowerNow,
                daya_digunakan : PowerUsed,
                suhu : Temperature,
                remainingTime :remainingTime,
                status_relay : relayStatus,
                latitude :latitude,
                longitude : longitude,
                token_id : token.id,
                distanceTravelled : DistanceTravelled,
                batteryPercentage : BatteryPercentage,
                chargingStatus : ChargingStatus
            })
        }else{
            battery_token.tegangan = Voltage,
            battery_token.arus = Current,
            battery_token.daya =PowerNow,
            battery_token.daya_digunakan = PowerUsed,
            battery_token.suhu = Temperature,
            battery_token.remainingTime =remainingTime,
            battery_token.status_relay = relayStatus,
            battery_token.latitude =latitude,
            battery_token.longitude = longitude,
            battery_token.distanceTravelled = DistanceTravelled,
            battery_token.batteryPercentage = BatteryPercentage,
            battery_token.chargingStatus = ChargingStatus
            await battery_token.save();
        }

        
    }
});

// Fungsi untuk publish data token ke topik token
export const publishTokenValue = async (token) => {
    let battery;
    const message = JSON.stringify(token);
    const token_data  = await Token.findOne({
        where :{token : token},
        attributes : ['id', 'token', 'status']
    })
    if (!token_data){
        throw new Error("Token is invalid");
    }
    const transaction = await RentTransaction.findOne({
        where :{token_id : token_data.id}
    })
    
    if(!transaction.battery_id) {
        battery = await Battery.create({
            token_id : token_data.id
        })
    }else{
        battery = await Battery.findOne({
            where : {id : transaction.battery_id}
        })
    }

    //update data rent_transactions
    transaction.status = "Active"; 
    transaction.battery_id = battery.id;
    transaction.save();

    //update data battery
    battery.token_id = token_data.id

    client.publish('FourDayTeam/input/token', message, (err) => {
        if (err) {
            console.error('Failed to publish token value:', err);
        } else {
            console.log('Published token value:', message);
        }
    });
};


