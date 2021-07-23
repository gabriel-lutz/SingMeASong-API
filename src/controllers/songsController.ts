import {Request, Response} from "express"

import { getRandomRecommendationService, insertSong } from "../services/songsService"
import { recommendationBody } from "../schemas"

export async function registerRecommendation(req: Request, res: Response){
    try{
        const validation = recommendationBody.validate(req.body)
        if(validation.error){
            return res.sendStatus(400)
        }
        const {name, youtubeLink} = req.body

        const status: number = await insertSong(name, youtubeLink)
        res.sendStatus(status)
    }catch(err){
        console.log(err)
        res.send(500)
    }
}

export async function getRandomRecommendation(req: Request, res: Response){
    try{
        const statusOrList = await getRandomRecommendationService()
        res.send(statusOrList)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}