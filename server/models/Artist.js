const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    followers: Schema.Types.Mixed,
    genres: Array,
    spotifyID: {type: String, required: true, unique: true},
    images: Array,
    href: String,
    name: String,
    normalizedName: String,
    popularity: Number,
});

module.exports = mongoose.model('Artist', artistSchema);