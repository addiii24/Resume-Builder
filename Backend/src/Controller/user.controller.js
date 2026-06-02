import usermodel from "../Model/user.model.js";
import tokenblacklist from "../Model/blacklist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const registeruser = async (req, res) => {
  const { username, email, password } = req.body;
 if(!username || !email || !password){
    res.status(400).json({message:"Please fill all the fields"});
   
 }
  const userExists = await usermodel.findOne(
    {$or : [{ email}, {username }]});

  if (userExists) {
    res.status(400).json({message:"User already exists with this email or username"});
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await usermodel.create({
    username,
    email,
    password: hashedPassword,
  });
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  if (user) {
    res.status(201).json(
      {
        message: "User registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        }
      }
    );
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export const loginuser = async (req,res) => {

    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
}

export const logoutuser = async (req,res) => {
   const token = req.cookies.token;
    if (token) {
      await tokenblacklist.create({ token });
    }
   res.clearCookie("token", {
    httpOnly: true,
  });
   
    res.status(200).json({message:"User logged out successfully"});
}

export const getMe = async (req,res) => {
  const user = await usermodel.findById(req.user.id);
  if (user) {
    res.status(200).json(
      {
        message: "User information retrieved successfully",
        user : {
        _id: user._id,
        username: user.username,
        email: user.email,
      }}
    )}
  else {
    res.status(404);
    throw new Error("User not found");
  }
};