import express, { request, response } from "express";  
import { PORT } from "./config.js";
import { mongodbURL } from "./keys.js"; // put the api keys from mongodb.com in this file and import
import mongoose from "mongoose";
import { Game } from "./models/gameModel.js";
import gamesRoute from "./routes/gamesRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5555',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']    
// }));

app.get('/', (request, response) => {
    //console.log(request);
    return response.status(234).send('haiii');
});

app.use('/games', gamesRoute);

mongoose.connect(mongodbURL)
    .then(() => {
        console.log('Alrighty, we are connected to the DB!');
        app.listen(PORT, () => {
            console.log('I am listening on ' + PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });