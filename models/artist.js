const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const artistSchema = new Schema({
    name: { type: String },
    song: { type: String },
    genre: { type: String },
    likes: { type: Number, default: 0 },
    body: { type: String }

},
    { timestamps: true }
)

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist