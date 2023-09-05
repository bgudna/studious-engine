import express, { response } from "express";  
import { PORT } from "./config.js";
import { mongodbURL } from "./keys.js"; // put the api keys from mongodb.com in this file and import
import mongoose from "mongoose";
import { Game } from "./models/gameModel.js";

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('haiii');
});

// route for posting a new game <-- temp!
app.post('/game', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.publisher ||
            !request.body.publishYear ||
            !request.body.genre
        ) {
            return response.status(400).send({
                message: 'Not all required fields have info: title, publisher, publishYear, genre',
            });
        }
        const newGame = {
            title: request.body.title,
            publisher: request.body.publisher,
            publishYear: request.body.publishYear,
            genre: request.body.genre,     
        };

        const game = await Game.create(newGame);
        return response.status(201).send(game);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
})

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