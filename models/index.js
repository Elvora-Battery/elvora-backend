import Users from "./UserModel.js";
import Battery from "./BatteryModel.js";
import FAQ from "./FAQModel.js";
import KTP from "./KTPModel.js";
import RentTransaction from "./RentTransactionModel.js";
import { RentType } from "./RentTypeModel.js";
import { ShippingDetail } from "./ShippingDetailModel.js";
import { Token } from "./TokenModel.js";
import { Subscription } from "./SubsriptionModel.js";
import { Notification } from "./NotificationModel.js";

KTP.hasOne(Users, {
    foreignKey: 'ktp_id',
});

Users.belongsTo(KTP, {
    foreignKey: 'ktp_id'
});

Users.hasMany(RentTransaction, {
    foreignKey: 'user_id',
});

RentTransaction.belongsTo(Users, {
    foreignKey: 'user_id'
});


ShippingDetail.hasMany(RentTransaction, {
    foreignKey: 'shipping_id',
});

RentTransaction.belongsTo(ShippingDetail, {
    foreignKey: 'shipping_id'
});

Battery.hasOne(Token, {
    foreignKey:'token_id'
})

Token.belongsTo(Battery,{
    foreignKey:'token_id'
})
RentTransaction.belongsTo(RentType, { foreignKey: 'rent_type_id' });
RentType.hasMany(RentTransaction, { foreignKey: 'rent_type_id' });

Token.hasMany(RentTransaction, {foreignKey: 'token_id'});
RentTransaction.belongsTo(Token, {foreignKey: 'token_id' });

Battery.hasOne(RentTransaction, {foreignKey: 'battery_id'});
RentTransaction.belongsTo(Battery, {foreignKey: 'battery_id' });

Battery.hasOne(Subscription, {foreignKey: 'battery_id'});
Subscription.belongsTo(Battery, {foreignKey: 'battery_id' });

RentTransaction.hasMany(Subscription, {foreignKey: 'rent_transaction_id'});
Subscription.belongsTo(RentTransaction, {foreignKey: 'rent_transaction_id' });

RentTransaction.hasMany(Notification, {foreignKey: 'rent_transaction_id'});
Notification.belongsTo(RentTransaction, {foreignKey: 'rent_transaction_id' });

Users.hasMany(Notification, {foreignKey: 'user_id'});
Notification.belongsTo(Users, {foreignKey: 'user_id' });

export { KTP, RentType, Users, RentTransaction, ShippingDetail, Token, Battery, Subscription, Notification }