import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenSetCookie from '../unils/generateToken.js';

export const signup = async (req,res) => {
    try {
        const{fullName,username,password,confirmpassword,gender} = req.body;

        if(password !== confirmpassword){
            return res.status(400).json({message:"Password do not match"});
        }

        const user = await User.findOne({username});

        if (user){
            return res.status(400).json({message:"Username already exists"});
        }

        //Hash password here 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //Dummy profile pic url

        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?usearname=${username}`;
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?usearname=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyprofilePic : girlprofilePic
        });

       if(newUser){
        generateTokenSetCookie(newUser._id,res);
        await newUser.save();
         res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic : newUser.profilePic
            });
        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
       }
 catch (error) {
        console.error("Error in signup controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async (req,res) => {
    try {
        const {username,password} =req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}   

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({massage:"Loged out successfully"});
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}       

