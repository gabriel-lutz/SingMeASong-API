import {Request, Response} from "express"

import { getRandomRecommendationService, getTopRecommendationsService, insertSong } from "../services/songsService"
import { recommendationBody } from "../schemas"

export async function registerRecommendation(req: Request, res: Response){
    try{
        const validation = recommendationBody.validate(req.body)
        if(validation.error){
            return res.sendStatus(400)
        }
        const {name, youtubeLink}:{name:string; youtubeLink:string} = req.body

        const status = await insertSong(name, youtubeLink)
        res.sendStatus(status)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getRandomRecommendation(req: Request, res: Response){
    try{
        const song = await getRandomRecommendationService()
        if(song === null){
            return res.sendStatus(404)
        }
        res.send(song)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getTopRecommendations(req: Request, res: Response){
    try{
        let amount = Number(req.params.amount)
        if(isNaN(amount) || amount <= 0){
            amount = 10 
        }
        const list = await getTopRecommendationsService(amount)
        if(list === null){
            res.sendStatus(404)
        }
        res.send(list)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}