import mongoose from "mongoose";

const gameSchema = mongoose.Schema( {
        title: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            trquired: true,
        },
        genre: {
            type: String,
            required: true,
        }
    },
        {
            timestamps: true,
        }
    );

export const Game = mongoose.model('Game', gameSchema);