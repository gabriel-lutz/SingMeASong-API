import express from "express";
import cors from "cors";

import {getRandomRecommendation, registerRecommendation} from "./controllers/songsController"
import { registerDownvote, registerUpvote } from "./controllers/voteController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", registerRecommendation)
app.post("/recommendations/:id/upvote", registerUpvote)
app.post("/recommendations/:id/downvote", registerDownvote)

app.get("/recommendations/random", getRandomRecommendation)

export default app;
