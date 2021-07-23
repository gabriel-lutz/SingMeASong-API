import connection from "../../../src/database";
    
export async function insertSong () {
    const name = "Test"
    const youtubeLink = "https://youtu.be/rPleicjySdI"

    await connection.query(`
        INSERT INTO recommendations 
        (name, "youtubeLink", score) 
        VALUES 
        ($1, $2, 0)`
        ,[name, youtubeLink])
}

