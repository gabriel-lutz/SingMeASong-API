import connection from "../database";

export async function insertSongIntoDatabase(name: string , youtubeLink: string){
    try{
        
        await connection.query(`
            INSERT INTO recommendations 
            (name, "youtubeLink", score) 
            VALUES 
            ($1, $2, 0)`
            ,[name, youtubeLink])
        return 201

    }catch(err){
        console.log(err)
        return 500
    }
}

export async function checkDuplicated(name: string , youtubeLink: string){
    try{
        
        const query = await connection.query(`
            SELECT * FROM recommendations
            WHERE name = $1 OR "youtubeLink" = $2
            `
            ,[name, youtubeLink]) 

         return query.rows[0]   
    }catch(err){
        console.log(err)
        return 500
    }
}