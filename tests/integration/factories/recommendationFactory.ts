import connection from "../../../src/database";
import faker from "faker"
    
export async function insertSong (vote:number) {
    const name = "Test"
    const youtubeLink = "https://youtu.be/rPleicjySdI"
    
    await connection.query(`
        INSERT INTO recommendations 
        (name, "youtubeLink", score) 
        VALUES 
        ($1, $2, $3)`
        ,[name, youtubeLink, vote])
}

export async function insertRandomSongs(quantity: number, score: number){
    for( let i = 0; i <= quantity; i++){
        await connection.query(`
            INSERT INTO recommendations 
            (name, "youtubeLink", score) 
            VALUES 
            ($1, $2, $3)`
        ,[faker.name.findName(), faker.internet.url(), Math.floor(Math.random() * score)])
    }

}

