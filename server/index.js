import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js";
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();

//setting up bodyParser to handle requests
app.use(bodyParser.json( {limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true}));
app.use(cors());

//posts prefix added to all routes
//http://localhost:3000/posts
app.use('/posts', postRoutes);

//hosts database cluster on mongoDB cloud
const uri = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));