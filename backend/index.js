import express, { request, response } from "express";  
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

// get games collection from DB
app.get('/games', async (request, response) => {
        try {
            const gamesList = await Game.find({})
            return response.status(200).json({
                count: gamesList.length,
                data: gamesList
            });

        } catch (error) {
            console.log(error.message);
            response.status(500).send({ message: error.message });
        }
})

// get a single game from DB
app.get('/game/:id', async (request, response) => {
    try {
        const { gameID } = request.params;

        const game = await Game.findById({gameID})
        return response.status(200).json({game});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// update a already logged game
app.put('/game/:id', async (request, response) => {
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

    const { gameID } = request.params;

    const result = await Game.findByIdAndUpdate(gameID, request.body);

    if(!result) {
        response.status(404).json( { message: 'Unable to find the selected game' });
    } else {
        response.status(200).json( { message: 'Game updated!'});
    }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//delete a game
app.delete('game/:id', async (request, response) => {
    try {

        const { gameID } = request.params;

        const result = await Game.findByIdAndDelete(gameID, request.body);

        if(!result) {
            response.status(404).json( { message: 'Unable to find the selected game' });
        } else {
            response.status(200).json( { message: 'Game deleted!'});
        }

    } catch (error) {
        console.log(error.message);
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