import KTP from "../../models/KTPModel.js";
import Users from "../../models/UserModel.js";


const createKTP = async(data, userId)=>{
    const nik = data.nik;
    try {
        const data_nik = await KTP.findOne({
            where :{nik}
        })
        const user = await Users.findOne({
            where :{id : userId}
        });
        if(data_nik){
            throw new Error("Duplicate entry detected");
        }
        if(user.ktp){
            throw new Error("This user already verified");
            
        }
        const result = await KTP.create({
            nik : data.nik,
            nama : data.nama,
            tanggal_lahir : data.tanggal_lahir
        })
        user.ktp_id = result.id;
        await user.save();
        return result;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

// const verifyKTP = async (modelUrl, data)=>{
//     const modelUrl = 'https://ocr-ktp-561333055774.asia-southeast2.run.app/verify-ktp';
//     try {
//         const file = data.file;
//     } catch (error) {
//         console.error(error.message); // Log error for debugging
//         throw error;
//     }
// }

export { createKTP };