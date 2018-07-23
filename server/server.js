const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('../config/keys');

const PORT = process.env.PORT || 5000;

const artistController = require('./controllers/artistController.js')

mongoose.connect(keys.mongoUri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected with MongoDB ORM - mongod-orm');
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../react-ui/public/index.html'));
})

app.get('/api/suggestArtists', artistController.checkArtistCollection, (req, res) => {
    console.log('res.locals.artists',res.locals.artists)
    res.send({ data: res.locals.artists})
})

app.get('/api/artistSearch?', artistController.getArtistsInfo, artistController.saveArtistsInfo, (req, res) => {
    res.send({ data: res.locals.artists})
})

app.get('/api/relatedArtistSearch?', artistController.getRelatedArtists, artistController.saveArtistsInfo, (req, res) => {
    res.send({ data: res.locals.artists})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});