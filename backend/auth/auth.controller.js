import { login } from "./auth.service.js";

const loginController = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const result = await login(email, password);
        return res.status(200).json({
            message:'Login Successfully',
            data : result
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export { loginController }