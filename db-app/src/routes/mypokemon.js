const express = require('express');

const {getMypokemon, getPokemonCount, addMypokemon, deleteMypokemon} = require('../controllers/mypokemon');

const router = express.Router();

router.route('/mypokemon/')
    .get(getMypokemon)
    .post(addMypokemon);

router.route('/mypokemon/:pokemonId')
    .get(getMypokemon);

router.route('/pokemon/')
    .get(getPokemonCount);

router.route('/mypokemon/:nickname')
    .delete(deleteMypokemon);

module.exports = router;