const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const colors = require('colors');
const Artist = require('./models/artist');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//Initiialization....
const app = express();
//Database connection..
const db = mongoose.connection;
//Database Config.
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Middleware..
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));


//Routes....

//Index Route...
app.get('/artists', (req, res) => {
    Artist.find({})
        .then((allArtists) => {
            res.send({ count: allArtists.length, data: allArtists })
        })
        .catch((error) => {
            res.status(500).json({ message: 'Something went wrong' })
        })
})
//Create Route..
app.post('/artists', (req, res) => {
    Artist.create(req.body)
        .then((createdArtist) => {
            res.send(createdArtist)
        })

        .catch((error) => {
            res.status(505).send(error.message)
        })
})
//Delete.
app.delete('/artists/:id', (req, res) => {
    Artist.findByIdAndDelete(req.params.id)
    .then((deletedArtist) => {
        res.send({data: 'Successfully Deleted'})
    })
    .catch((error) => {
        res.status(422).send("Error")
    })
})

//Update
app.put('/artists/:id', (req, res) => {
    Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedArtist) => {
        res.send(updatedArtist)
    })
    .catch((error) => {
        res.status(418).send()
    })
})
//Show Route..
app.get('/artists/:id', (req, res) => {
    Artist.findById(req.params.id)
    .then((showArtistt) => {
        res.send(showArtistt);
    })
    .catch((error) => {
        res.status(401).send("No artist found")
    })
})

//Database Success/ Error msgs
db.on('connected', () => console.log(`Database Connected`));
db.on('error', (err) => console.log(err.message + ' is MogoDB connected?'));
db.on('disconnected', () => console.log(`Database is Disconnected`));


//Listeners..
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}....`.inverse.blue)
})