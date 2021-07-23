import connection from "../database";

export async function checkIfSongExistsById(id:number){
    try{
        const query = await connection.query(`
        SELECT * 
        FROM recommendations 
        WHERE id = $1
        `, [id])
        if(query.rows[0]){
            return true
        }else{
            return false
        }
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

    }catch(err){
        console.log(err)
        return 500
    }
}