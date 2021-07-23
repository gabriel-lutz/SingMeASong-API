import express from "express";
import cors from "cors";

import {registerRecommendation} from "./controllers/songsController"
const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", registerRecommendation)

export default app;
