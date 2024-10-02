import Users from "../../models/UserModel.js";
import RentTransaction from "../../models/RentTransactionModel.js";
import { Token } from "../../models/TokenModel.js";
import Battery from "../../models/BatteryModel.js";
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { generateOtp, sendOtpEmail, forgotPasswordEmail } from "../../config/emailService.js";


    const register= async(data, callBack)=>{
        try{
            const email = await Users.findOne({
                where:{email : data.email}
            })
            if(email){
                throw new Error("this email has been used");
                
            }
            const otp_code= generateOtp();
            const results = await Users.create({
                email: data.email,
                name: data.name,
                level:"user",
                otp_code,
                otp_verify: false,
            });
            await sendOtpEmail(data.email, otp_code);
            return results;

        }catch(error){
            console.error(error.message); // Log error for debugging
            throw error;
        }
    };

    const resendOtp = async(email) =>{
        try {
            const user = await Users.findOne({
                where: {email},
               });
            if(!user){
                throw new Error('User not found');
            }
            const otp_code= generateOtp();
            user.otp_code = otp_code;
            await user.save();
            await sendOtpEmail(user.email, otp_code);
            
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            // Cari pengguna berdasarkan email, OTP, dan masa berlaku OTP
           const user = await Users.findOne({
            where: {email},
           });
           if(!user){
            throw new Error('User not found');
           }

           if(user.otp_code !== otp){
            throw new Error('Invalid OTP');
           }

           //if otp is valid
           user.otp_verify = true;
           await user.save();
           return user;
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    };

    const setPassword = async (email, password, confirmPassword) => {
        try {
            if(password !== confirmPassword){
                throw new Error('Password and Confirm Password do not match');
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!password.match(passwordRegex)){
                throw new Error('Password must be at least 8 characters and include uppercase letter, lowercase letter, number, and special symbol');
            }

            const user = await Users.findOne({
                where: { email },
            });
            if(!user){
                throw new Error("User not found");  
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();
        } catch (error) {
            console.error('Error in setPassword:', error.message); // Log error for debugging
            throw error;
        }
    };
    
    const updatePassword = async (userId, currentPassword, newPassword, confirmNewPassword)=>{
        try {
            const user = await Users.findByPk(userId);
            if(!user){
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                throw new Error("Invalid current password");
                
            }
            if(newPassword !== confirmNewPassword){
                throw new Error('New Password and Confirm New Password do not match');
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!newPassword.match(passwordRegex)){
                throw new Error('Password must be at least 8 characters and include uppercase letter, lowercase letter, number, and special symbol');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    };

    const dashboard = async (userId) =>{
        let battery, transaction,  token;
        try {
            let user = await Users.findOne({
                where :{ id : userId},
                attributes : ['id', 'email', 'name']
            })
            if (!user) {
                user = {}
            }

            const transactionDefault = await RentTransaction.findOne({
                where :{user_id : userId, isDefault : true},
                attributes : ['id','rent_type_id', 'battery_name', 'token_id']
            });

            transaction = await RentTransaction.findOne({
                where :{user_id : userId, status :"Active"},
                attributes : ['id','rent_type_id', 'battery_name', 'token_id']
            });
            // console.log("Token ID:", transaction.token_id);

            if(transaction){
                 token = await Token.findOne({
                    where : { id : transaction.token_id},
                    attributes : ['id', 'token']
                })
                if(token){
                    battery = await Battery.findOne({
                        where:{token_id : token.id}
                    })
                    if(!battery){
                        battery = {}
                    }
                }
                
            }else{
                transaction = {};
                token = {};
                battery = {}
            }
            if(transactionDefault){
                return {
                    battery, transactionDefault, user
                }
            }else{
                return {
                    battery, transaction, user
                };
        
            }
            
    
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    
    }


    const forgotPassword = async (email) =>{
        try {
            const user = await Users.findOne({
                where :{email : email}
            })
            if(!user){
                throw new Error("Email not found");
            }
            const otp_code= generateOtp();
            user.otp_code = otp_code;
            await user.save();
            await forgotPasswordEmail(user.email, otp_code);
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    }

    const resetPassword = async (token, newPassword, confirmPassword) =>{ 
        try {
            const user = await Users.findOne ({
                where : {otp_code : token}
            })
            if(!user){
                throw new Error("User not found");
            }
            if(user.otp_code !== token){
                throw new Error('Invalid Token');
            }

            if(newPassword !== confirmPassword){
                throw new Error('Password and Confirm Password do not match');
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!newPassword.match(passwordRegex)){
                throw new Error('Password must be at least 8 characters and include uppercase letter, lowercase letter, number, and special symbol');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            
        } catch (error) {
            console.error(error.message); // Log error for debugging
            throw error;
        }
    }

    export { register, resendOtp, verifyOtp, setPassword, updatePassword, dashboard, forgotPassword, resetPassword} ;

