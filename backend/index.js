import express from "express";  
import { PORT } from "./config.js";
import { mongodbURL } from "./keys.js"; // put the api keys from mongodb.com in this file and import
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('haiii');
});

mongoose.connect(mongodbURL)
    .then(() => {
        console.log('Alrighty, we are connected to the DB!');
        app.listen(PORT, () => {
            console.log('I am listening!')
        });
    })
    .catch((error) => {
        console.log(error);
    });