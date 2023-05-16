//const express = require('express');
import express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
import {userRouter} from './routes/users.js';

const app = express();


//middlewear - convert data to json format
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);

mongoose.connect(process.env.MONGO_URL);

app.listen(3001, () => console.log('Server started'));



//password 
//rwkPz6YjYMOmKTO1