import express from "express";
import cors from "cors";

import {registerRecommendation} from "./controllers/songsController"
import { registerUpvote } from "./controllers/voteController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", registerRecommendation)
app.post("/recommendations/:id/upvote", registerUpvote)

export default app;
