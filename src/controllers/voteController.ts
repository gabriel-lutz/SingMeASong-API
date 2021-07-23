import { Request, Response } from "express"
import { upvoteService } from "../services/voteService"

export async function registerUpvote(req: Request, res: Response){
    try{    
        const id:number = Number(req.params.id)
        if(!id || id <= 0){
            return res.sendStatus(400)
        }

        const statusCode = await upvoteService(id)

        res.sendStatus(statusCode)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}