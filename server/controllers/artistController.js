const axios = require('axios');
const keys = require('../../config/keys');
const request = require('request'); // "Request" library

const Artist = require('../models/Artist');

const artistController = {};

// application requests authorization
const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(keys.spotifyClientID + ':' + keys.spotifyClientSecret).toString('base64')),
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

artistController.checkArtistCollection = (req, res, next) => {
    let searchInput = new RegExp(req.query.searchInput);
    Artist.find({ normalizedName: searchInput }, (err, results) => {
        if (err === null) {
            res.locals.artists = results;
            next();
        } else {
            console.log('errror');
            next();
        }
    })
}

artistController.getArtistsInfo = (req, res, next) => {
    let searchInput = req.query.searchInput;

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            const token = body.access_token;
            const options = {
                url: `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true,
            };
            request.get(options, function (error, response, body) {
                res.locals.artists = body.artists.items;
                next();
            });
        }
    });
};

artistController.saveArtistsInfo = (req, res, next) => {
    let artists = res.locals.artists.map(artist => {
        artist.spotifyID = artist.id;
        delete artist.id;
        artist.normalizedName = artist.name.toLowerCase().trim().replace(/\s+/g, '');
        return artist;
    });

    async function A() {
        try {
            let result = await new Promise((resolve, reject) =>
                Artist.insertMany(artists,
                    { "ordered": false },
                    (err, result) => {
                        console.log(result)
                        if (err) reject(result);    // Because the errors are here as well
                        resolve(result);
                    }
                )
            );
            console.log(result);  // Never gets here
        } catch (e) {
            console.log(e);
        }
    }
    let results = A();
    console.log('YAYYYY', results);
    next();
};

artistController.getRelatedArtists = (req, res, next) => {
    let genres = req.query.genres;
    let genreStr;
    if (req.query.type === 'any') {
        genreStr = genres.map(el => `genre:"${el}"`).join(',').replace(/,/g, ' OR ');
    }
    if (req.query.type === 'all') {
        genreStr = genres.map(el => `genre:"${el}"`).join(' ');
    }
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            const token = body.access_token;
            console.log('token', token)

            const options = {
                url: 'https://api.spotify.com/v1/search?',
                qs: {
                    q: genreStr,
                    type: 'artist',
                    limit: 11
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true,
            };

            request.get(options, function (error, response, body) {
                console.log('test in server', body)
                res.locals.artists = body.artists.items;
                next();
            });
        }
    });
};

module.exports = artistController;