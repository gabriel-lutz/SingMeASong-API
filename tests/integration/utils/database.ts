import connection from "../../../src/database";
    
export async function clearDatabase () {
  await connection.query(`TRUNCATE recommendations RESTART IDENTITY`);
}

export async function closeConnection () {
  await connection.end();
}

export async function checkListLength(){
  const query = await connection.query(`SELECT * FROM recommendations`)
  return query.rows.length
}