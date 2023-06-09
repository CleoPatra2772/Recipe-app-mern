import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
// import { users } from '../models/User.js';


const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(10);

// router.post("/register", async (req, res) => {
//     const {username, password} = req.body;

//     const user = await UserModel.findOne({username : username});
    
//     if(user){
//         return res.json({message : "User already exists!"});
//     }

//     const hashedPassword = await bcrypt.hash(password, 8);

//     const newUser = new UserModel({username, password: hashedPassword});
//     await newUser.save();

   

//     res.json({message: "User registered successful"})

// })
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hashSync(password, bcryptSalt);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
    
  });


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  });




export {router as userRouter};
