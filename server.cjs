require('dotenv').config();
const express = require('express');
const client = require('./db/client.cjs');
const { getFlavors, getFlavorByName } = require('./db/getFlavors.cjs');
const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
