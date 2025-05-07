import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing credentials!" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const mailOptions={
            from : process.env.SENDER_MAIL,
            to : email,
            subject:"Aya wnk Ay, marhba bik 3anna !",
            text:`el mail mt3ek tesna3 : ${email}`
        }
        /*
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            return res.json({ success: false, message: "Registration successful, but email not sent!" });
        }*/
        

        return res.json({ success: true, message: "Registration successful!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required!" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Login successful!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const sendVerifyOtp = async(req,res)=>{
    try {
        const {userId}=req.body;
        const user = await userModel.findOne({ _id: userId });


        if(user.isAccountVerified){
            return res.json({success:true,message:"account already verified !"});
        }

        const otp = String(Math.floor(100000 + Math.random()*90000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 *60 * 60 * 1000;

        await user.save();

        const mailOption={
            from : process.env.SENDER_MAIL,
            to : user.email,
            subject:"El Otp wsel 7ouma !",
            text:`el Otp mt3ek ya rojla : ${otp}`
        }
        await transporter.sendMail(mailOption);

        res.json({success:true,message:'Otp sent to you , check inbox ! '})

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export const verifyEmail = async (req,res)=>{
    
    const {userId,otp} = req.body;

    if(!userId || !otp){
        return res.json({success:false,message:'missing verification details !'});
    }

    try {
        const user = await userModel.findById(userId);
        if(!user){
            res.json({success:false,message:'user not found !'});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            res.json({success:false,message:'invalid otp !'});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            res.json({success:false,message:'otp expired !'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        res.json({success:true,message:'Email verified successfully !'});


    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export const isAuthenticated = async(req,res)=>{
    try {
        return res.json({success:true,message:"he's good, he's authentificated !"});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export const sendResetOtp = async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false, message:"email is required"})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        
        const otp = String(Math.floor(100000 + Math.random()*90000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 *60 * 1000;
        await user.save();

        const mailOption={
            from : process.env.SENDER_MAIL,
            to : user.email,
            subject:"El Otp wsel marra o5ra 7ouma !",
            text:`el Otp mt3ek ya rojla : ${otp}`
        }
        await transporter.sendMail(mailOption);

        return res.json({success:true,message:'otp has benn sent again brother !'})

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export const resetPassword = async(req, res )=>{
    const {email , otp , newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"email , otp and new password are required !"})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found !"});
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success:false , message:"Invalid Otp !"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false , message:"Otp expired !"});
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success:true , message:"Password has been reset !"});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}