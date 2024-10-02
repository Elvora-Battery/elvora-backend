import { register , resendOtp, verifyOtp, setPassword, updatePassword, dashboard, forgotPassword, resetPassword} from "./user.service.js";

    const registration= async(req,res)=>{
        const body = req.body;
        
        try {
            const results = await register(body);
            return res.status(200).json({
                success:1,
                data:{
                    "email":results.email,
                    "name":results.name
                },
                message: "OTP has sent to your email. Please verify your OTP."
            });
        }catch (error){
            res.status(400).json({
                message: error.message,
            });
        }
    };

    const resendOTPController = async (req, res)=>{
        const { email } = req.body;
        try {
            await resendOtp(email);
            res.status(200).json({
                message:'New OTP code has been sent to your email',
            });
            
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };

    const verifyOTPController = async (req,res)=>{
        const { email, otp } = req.body;

        try{
            await verifyOtp(email, otp);
            res.status(200).json({
                message:'OTP verified successfully',
            });
        } catch (error){
            res.status(400).json({
                message: error.message,
            });
        }
    };

    const setPasswordController = async (req, res)=>{
        const { email, password, confirmPassword } = req.body;
        try {
            await setPassword(email, password, confirmPassword);
            res.status(200).json({
                message:"Password has been set successfully",
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    const updatePasswordController = async (req, res)=>{
        const userId = req.user.UserId; 
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        try {
            await updatePassword (userId, currentPassword, newPassword, confirmNewPassword);
            res.status(200).json({
                message:"New Password has been set successfully",
            })            
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    const dashboardController = async (req, res) =>{
        
        if (!req.user || !req.user.UserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        let message;
        const userId = req.user.UserId;
        try {
            const result = await dashboard(userId);
            if (!result.transaction.id){
                message = "There is no active subscription"
            }else {
                message = "Subscription is active"
            }
            res.status(200).json({
                data: result,
                message : message
            }) 
    
        } catch (error) {
            res.status(201).json({
                message: error.message,
            });
        }
    }

    const forgotPasswordController = async (req, res) =>{
        const email = req.body.email;
        try {
            await forgotPassword (email);
            res.status(200).json({
                message : "Token to reset your password has sent to your email"
            })
        } catch (error) {
            res.status(201).json({
                message: error.message,
            });
        }
    }

    const resetPasswordController = async (req, res)=>{
        const token = req.body.token;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        try {
            await resetPassword (token, newPassword, confirmPassword);
            res.status(200).json({
                message : "Your password is successfully updated"
            })
        } catch (error) {
            res.status(201).json({
                message: error.message,
            });
        }
    }

    export { registration, resendOTPController, verifyOTPController, setPasswordController, updatePasswordController, dashboardController, forgotPasswordController, resetPasswordController};

