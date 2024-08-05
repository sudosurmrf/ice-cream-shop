const client = require('./client.cjs');



const dropTables = async() => {

  try{
    await client.query(`
      DROP TABLE IF EXISTS flavors`)
  }catch(err) {
    console.log(err)
  }
} 

const createTables = async () => {

  try{
    await client.query(`
      CREATE TABLE flavors (
      id SERIAL PRIMARY KEY,
      flavor VARCHAR(30) NOT NULL,
      is_favorite BOOLEAN NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
      );`);

  }catch(err){
    console.log(err)
  }

}

const getTableInfo = async(tableName) => {

  try{
    const { rows } = await client.query(`
      SELECT * FROM ${tableName};`)

    return rows;


  }catch(err){
    console.log(err)
  }
}



const createFlavor= async () => {
  try{
    await client.query(`
      INSERT INTO flavors (flavor, is_favorite, created_at, updated_at)
      VALUES ('${flavor}', '${is_favorite}', '${created_at}', '${updated_at}');`);


  }catch(err){
    console.log(err)
  }

}

const syncAndSeed = async() => {

  await client.connect();
  console.log('Connected!');

  await dropTables();
  console.log('tables dropped!');

  await createTables();
  console.log('table created!');

  await createFlavor();
  console.log('flavor created!');



  

}

syncAndSeed();



module.exports = { dropTables, createTables, getTableInfo }