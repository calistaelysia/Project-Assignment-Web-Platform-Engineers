const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const mypokemonRoute = require('./src/routes/mypokemon');

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.disable('x-powered-by');

app.use(cors());
app.use('/api/v1', mypokemonRoute);

app.listen(3000, console.log('Listening PORT:3000'));