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
      // console.log(rows);


  }catch(err){
    console.log(err)
  }
}



const createFlavor= async (flavor, is_favorite) => {
  try{
    await client.query(`
      INSERT INTO flavors (flavor, is_favorite, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW());
      `,
      [flavor, is_favorite]
    );


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

  await createFlavor('Chocolate', false);
  await createFlavor('Vanilla', false);
  await createFlavor('Mint Chocolate', true);
  await createFlavor('strawberry', false);
  console.log('flavor created!');

  await getTableInfo('flavors');
  console.log('table returned');


  await client.end();
  

}

syncAndSeed();



module.exports = { dropTables, createTables, getTableInfo }