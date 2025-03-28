import User from "../model/user.model.js";

import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const createdUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await createdUser.save();
    res.status(201).json({ message: "User created successfully" ,user:{
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
    } });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login=async(req ,res)=>{
     try{
        const {email,password}=req.body;
        const user= await User.findOne({email});
        const isMatch=await bcrypt.compare(password ,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message: "Invalid username and password!"})
        }
        else{
              res.status(200).json({message: 'Login successfull' ,user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email
              }})
        }
     }catch(error){

     }
}