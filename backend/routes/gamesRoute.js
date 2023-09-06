import express from "express";
import { Game } from "../models/gameModel.js";

const router = express.Router();

// route for posting a new game <-- temp!
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router;