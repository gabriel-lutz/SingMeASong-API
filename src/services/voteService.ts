import { checkIfSongExistsById, registerUpvoteIntoDatabase } from "../repositories/voteRepository"


export async function upvoteService(id:number){
    try{
        const exists = await checkIfSongExistsById(id)
        if (!exists){
            return 406
        }

        await registerUpvoteIntoDatabase(id)

        return 200
    }catch(err){
        console.log(err)
        return 500
    }
}