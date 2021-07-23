import { Request, Response } from "express"
import { downvoteService, upvoteService } from "../services/voteService"

export async function registerUpvote(req: Request, res: Response){
    try{    
        const id:number = Number(req.params.id)
        if(!id || id <= 0){
            return res.sendStatus(400)
        }

        res.sendStatus(await upvoteService(id))
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function registerDownvote(req: Request, res: Response){
    try{    
        const id:number = Number(req.params.id)
        if(!id || id <= 0){
            return res.sendStatus(400)
        }

        const statusCode = await downvoteService(id)

        res.sendStatus(statusCode)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}