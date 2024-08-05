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

module.exports = { getFlavors, getFlavorByName };