import connection from "../database";

export interface QueryResult {
    id: number,
    name:string,
    youtubeLink:string,
    score:number
}

interface QuerySearchData { 
    name: string,
    youtubeLink: string
}



export async function insertSongIntoDatabase(data: QuerySearchData): Promise<number>{
    try{
        
        await connection.query(`
            INSERT INTO recommendations 
            (name, "youtubeLink", score) 
            VALUES 
            ($1, $2, 0)`
            ,[data.name, data.youtubeLink])
        return 201

    }catch(err){
        console.log(err)
    }
}


export async function checkDuplicated(data: QuerySearchData):Promise<QueryResult>{
    try{
        
        const query = await connection.query(`
            SELECT * FROM recommendations
            WHERE name = $1 OR "youtubeLink" = $2
            `
            ,[data.name, data.youtubeLink]) 

         return query.rows[0]   
    }catch(err){
        console.log(err)
    }
}

export async function getAllSongs(): Promise<QueryResult[]>{
    try{
        const query = await connection.query("SELECT * FROM recommendations")
        return query.rows
    }catch(err){
        console.log(err)
    }
}

export async function getTopSongs(amount:number): Promise<QueryResult[]>{
    try{
        const query = await connection.query(`
        SELECT * FROM recommendations ORDER BY score DESC LIMIT $1
        `, [amount])
        return query.rows
    }catch(err){
        console.log(err)
    }
}