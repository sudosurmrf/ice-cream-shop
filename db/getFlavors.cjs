const client = require('./client.cjs');



const getFlavors = async() => {
  try{
    const { rows } = await client.query(`
      SELECT flavor FROM flavors;`)

    return rows;


  }catch(err){
    console.log(err)
  }
}


const getFlavorByName = async(flavorName) => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM flavors 
      WHERE flavor = $1;`
      ,
    [flavorName]
  );

    return rows;

  }catch(err) {
    throw new Error
  }

};


const createFlavor = async(flavor, is_favorite) => {
  try {
    await client.query(`
      INSERT INTO flavors (flavor, is_favorite, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW());
      `,
    [flavor, is_favorite]);
  }catch(err) {
    console.log(err);
    throw new Error(`Couldn't create flavor`);
  }
}


module.exports = { getFlavors, getFlavorByName, createFlavor };