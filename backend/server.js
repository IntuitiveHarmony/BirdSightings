const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Sighting = require('./models/sighting.js');

const app = express();

app.use(express.json())
app.use(cors())


//-----------------------------------------------
//      GET SINGLE SIGHTING
//-----------------------------------------------
app.get('/sightings/:id', (req, res) => {
  Sighting.find({}, (err,foundSighting) => {
    res.json(foundSighting)
  })
})

//-----------------------------------------------
//      NEW SIGHTING
//-----------------------------------------------
app.post('/sightings', (req, res) => {
  Sighting.create(req.body, (err, createdSighting)=>{
    res.json(createdSighting)
  })
})

//-----------------------------------------------
//      GET ALL SIGHTINGS
//-----------------------------------------------
app.get('/sightings', (req, res) => {
  Sighting.find({}, (err,foundSightings) => {
    res.json(foundSightings)
  })
})

//-----------------------------------------------
//      DELETE SIGHTING
//-----------------------------------------------
app.delete('/sightings/:id', (req, res) => {
  Sighting.findByIdAndRemove(req.params.id, (err, deletedSighting) => {
    res.json(deletedSighting)
  })
})

//-----------------------------------------------
//      EDIT SIGHTING
//-----------------------------------------------
app.put('/sightings/:id', (req, res) => {
  Sighting.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSighting) => {
    res.json(updatedSighting)
  })
})


//-----------------------------------------------
//      CONNECTIONS
//-----------------------------------------------
//  CONNECT TO NODEMON
app.listen(3000, () => {
  console.log('Listening...')
});


// CONNECT TO MONGO AND NAME SUBDATABASE
mongoose.connect('mongodb://localhost:27017/sightings')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...');
})
