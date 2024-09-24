import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Users from '../../models/UserModel.js';

const login = async (email, password)=>{
    try {
        const user = await Users.findOne({
            where: { email },
            attributes : ['id', 'email', 'name', 'password', 'otp_verify']
        });
        if(!user){
            throw new Error("Invalid email or password");   
        }
        // if(!user.password){
        //     throw new Error("This email has been used but not setting up the password yet");
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
            
        }
        
        const token = jwt.sign(
            {UserId :user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '23h'}
        );

        const userResponse = {
            id: user.id,
            email: user.email,
            name: user.name,
            verify : user.otp_verify
          };
        
        return {token, user : userResponse}
    } catch (error) {
        console.error(error.message); 
        throw error;
    }
}

export { login }