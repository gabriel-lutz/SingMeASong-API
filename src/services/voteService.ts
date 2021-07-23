import { checkIfSongExistsById, deleteSongFromDatabase, registerDownvoteIntoDatabase, registerUpvoteIntoDatabase } from "../repositories/voteRepository"


export async function upvoteService(id:number){
    try{
        const songQuery = await checkIfSongExistsById(id)
        if (!songQuery){
            return 406
        }

        return await registerUpvoteIntoDatabase(id)
    }catch(err){
        console.log(err)
        return 500
    }
}

export async function downvoteService(id:number){
    try{
        const songQuery = await checkIfSongExistsById(id)
        if (!songQuery){
            return 406
        }else if (songQuery?.score === -5){
            return await deleteSongFromDatabase(id)
        }

        return await registerDownvoteIntoDatabase(id)
    }catch(err){
        console.log(err)
        return 500
    }
}