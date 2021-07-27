import connection from "../database";
import { QueryResult } from "./songsRepository"

export async function checkIfSongExistsById(id:number): Promise<QueryResult>{
    try{
        const query = await connection.query(`
        SELECT * 
        FROM recommendations 
        WHERE id = $1
        `, [id])

        return query.rows[0]
    }catch(err){
        console.log(err)
    }
}

export async function deleteSongFromDatabase(id:number){
    try{
        await connection.query(`
        DELETE 
        FROM recommendations 
        WHERE id = $1
        `, [id])
        return 200
    }catch(err){
        console.log(err)
        return 500
    }
}

export async function registerUpvoteIntoDatabase(id:number){
    try{
        await connection.query(`
        UPDATE recommendations SET score = score+1 WHERE id = $1
        `, [id])
        return 200
    }catch(err){
        console.log(err)
        return 500
    }
}

export async function registerDownvoteIntoDatabase(id:number){
    try{
        await connection.query(`
        UPDATE recommendations SET score = score-1 WHERE id = $1
        `, [id])
        return 200
    }catch(err){
        console.log(err)
        return 500
    }
}