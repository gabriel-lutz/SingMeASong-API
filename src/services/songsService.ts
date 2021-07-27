import { insertSongIntoDatabase, checkDuplicated, getAllSongs, getTopSongs } from "../repositories/songsRepository";

export async function insertSong(name: string, youtubeLink:string){
    try{
        const duplicated = await checkDuplicated({name, youtubeLink})
        if(duplicated){
            return 409
        }
        return await insertSongIntoDatabase({name, youtubeLink})
    }catch(err){
        console.log(err)
        return 500
    }
}

interface Recommendation {
    id: number,
    name:string,
    youtubeLink:string,
    score:number
}

export async function getRandomRecommendationService(): Promise<Recommendation>{
    try{
        const songsList = await getAllSongs()
        if(!songsList.length){
            return null
        }
        
        if(Math.random() >= 0.7){
            const filteredList = getBelow10(songsList)
            const listLength = filteredList.length

            if(listLength){
                return filteredList[Math.floor(Math.random() * listLength)]
            }else{
                return songsList[Math.floor(Math.random() * songsList.length)]
            }
            
        }else{
            const filteredList = getAbove10(songsList) 
            const listLength = filteredList.length

            if(listLength){
                return filteredList[Math.floor(Math.random() * listLength)]
            }else{
                return songsList[Math.floor(Math.random() * songsList.length)]
            }
        }
    }catch(err){
        console.log(err)
    }
}

export async function getTopRecommendationsService(amount: number): Promise<Recommendation[]>{
    try{
        const songsList = await getTopSongs(amount)
        if(!songsList.length){
            return null
        }else{
            return songsList
        } 
    }catch(err){
        console.log(err)
    }
}

function getBelow10(list: any[]){
    return list.filter(s =>{
        if(s.score <= 10){
            return true
        }else{
            return false
        }
    })
}

function getAbove10(list: any[]){
    return list.filter(s =>{
        if(s.score > 10){
            return true
        }else{
            return false
        }
    })
}