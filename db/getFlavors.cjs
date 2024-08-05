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


const updateFlavor = async(flavor, is_favorite) => {
  try{
    const { rows } = await client.query(`
      UPDATE flavors
      SET flavor = $1, is_favorite = $2, updated_at = NOW()
      WHERE flavor =$1
      RETURNING *;
      `,[flavor, is_favorite]);
    return rows[0]; 
  }catch(err){
    console.log(err)
    throw new Error(`couldn't update the table`);
  }
}

module.exports = { getFlavors, getFlavorByName, createFlavor, updateFlavor };