const express = require('express');
var cors = require('cors')

const mypokemonRoute = require('./src/routes/mypokemon');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.disable('x-powered-by');

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
// });

app.use(cors());
app.use('/api/v1', mypokemonRoute);

app.listen(3000, console.log('Listening PORT:3000'));