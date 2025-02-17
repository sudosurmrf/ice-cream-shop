require('dotenv').config();
const express = require('express');
const client = require('./db/client.cjs');
const { getFlavors, getFlavorByName, createFlavor, updateFlavor } = require('./db/getFlavors.cjs');
const app = express();
const axios = require('axios');

app.use(express.json());

client.connect();

app.get('/api/flavors', async (req, res, next) => {
  try {
    const flavors = await getFlavors();
    res.json(flavors);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/flavors/:flavor', async (req, res, next) => {
  try {
    const flavorName = req.params.flavor;
    console.log(`Received request for flavor: ${flavorName}`);
    const flavor = await getFlavorByName(flavorName);
    if (flavor) {
      res.json(flavor);
    } else {
      res.status(404).send('Flavor not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/flavors', async (req, res, next) => {
  try{
    const { flavor, is_favorite } = req.body;
    await createFlavor(flavor, is_favorite);
    res.send('Flavor Added!');

  }catch(err) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }

})

app.put('/api/flavors/:id', async (req, res, next) => {
  try{
    
    const { flavor, is_favorite } = req.body;
    const updatedFlavor = await updateFlavor(flavor, is_favorite);
    if(updatedFlavor) {
      res.json(updatedFlavor);
    } else {
      res.status(404).send("Flavor not found");
    }

  }catch(err){
    console.log(err)
    res.status(500).send('Internal Serv Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
