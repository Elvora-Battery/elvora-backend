import { createKTP } from "./ktp.service.js";
import axios from "axios";
import FormData from "form-data";
import Multer from "multer";

const multer = Multer({
    storage: Multer.memoryStorage
})


const createKTPController = async (req, res)=>{
    const userId = req.user.UserId
    const data = req.body;
    try {
        await createKTP (data, userId);
        return res.status(200).json({
            success:1,
            message:"ID Card data has been verified",
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const verifyKTP =  [multer.single('file'),(req, res)=>{
    const modelUrl = 'https://ocr-ktp-561333055774.asia-southeast2.run.app/verify-ktp';
    const file = req.file;
    console.log(req.header);

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Buat FormData untuk mengirim file
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    try {
        const response = axios.post(modelUrl, formData, {
            headers: {
                ...formData.getHeaders(), // Set proper headers for multipart/form-data
            },
        });
        return res.send(response.data);
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}]

export { createKTPController, verifyKTP }