import { insertSongIntoDatabase, checkDuplicated } from "../repositories/songsRepository";


export async function insertSong(name: string, youtubeLink:string){
    try{
        const duplicated = await checkDuplicated(name, youtubeLink)
        if(duplicated){
            return 409
        }
        return await insertSongIntoDatabase(name, youtubeLink)
    }catch(err){
        console.log(err)
        return 500
    }
}