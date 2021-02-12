const pool = require('../config/db');

/**
 * @method GET
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getMypokemon = async (req, res) => {
    try {
        const {pokemonId} = req.params;

        const conn = await pool.getConnection();
        let query = "", pokemons, totalData;

        if (pokemonId !== undefined) {
            console.log("masuk pokemonId is not undefined");
            query = `SELECT COUNT(id) as ownNum, name, urlnum FROM mypokemon WHERE urlnum = ?`;
            [pokemons] = await conn.execute(query, [pokemonId]);
            
            await conn.release();
            return res.send({status: "true", message: "Fetching data success", results: pokemons[0]});
        } else {
            console.log("masuk pokemonId is undefined");
            query = `SELECT nickname, name, urlnum FROM mypokemon`;
            [pokemons] = await conn.execute(query);
            
            await conn.release();
            return res.send({status: "true", message: "Fetching data success", results: pokemons});
        }

    } catch (error) {
        console.log(error);
        return res.send({status: "false", message: "Fetching data failed", error: error});
        // if (pokemonId !== undefined){
        //     return res.send({status: "false", message: "Fetching data failed"});
        // } else {
        //     return res.send({status: "false", message: "Id not found"});
        // }
    }
}
/**
 * @method GET
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getPokemonCount = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        let query = "", pokemons, totalData;

        query = `SELECT COUNT(id) as ownNum, name, urlnum FROM mypokemon GROUP BY name, urlnum`;
        [pokemons] = await conn.execute(query);
        
        await conn.release();
        return res.send({status: "true", message: "Fetching data success", results: pokemons});

    } catch (error) {
        console.log(error);
        return res.send({status: "false", message: "Fetching data failed", error: error});
        // if (pokemonId !== undefined){
        //     return res.send({status: "false", message: "Fetching data failed"});
        // } else {
        //     return res.send({status: "false", message: "Id not found"});
        // }
    }
}

/**
 * @method POST
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addMypokemon = async (req, res) => {
    try {
        const {nickname, name, urlnum} = req.body;

        const conn = await pool.getConnection();
        var fieldSet = {
            nickname: nickname,
            name: name,
            urlnum: urlnum
        }
        let query = `INSERT INTO mypokemon SET ?`;
        const [result] = await conn.query(query, fieldSet);

        await conn.release();
        return res.send({status: "true", message: "Storing data success", stored: req.body});

    } catch (error) {
        return res.send({status: "false", message: "Storing data failed", error: error});
    }
}

/**
 * @method DELETE
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteMypokemon = async (req, res) => {
    try {
        const {nickname} = req.params;
        const conn = await pool.getConnection();

        const qData = `SELECT nickname, name, urlNum FROM mypokemon WHERE nickname = ?`;
        const [resData] = await conn.execute(qData, [nickname]);

        const query = `DELETE FROM mypokemon WHERE nickname = ?`;
        const [result] = await conn.execute(query, [nickname]);
        
        await conn.release();
        return res.send({status: "true", message: "Destroy data success", deleted: resData});
    } catch (error) {
        if (nickname !== undefined){
            return res.send({status: "true", message: "Destroy data failed", error: error});
        } else{
            return res.send({status: "true", message: "Pokemon nickname not found"});
        }
    }

}

module.exports = {
    getMypokemon, getPokemonCount, addMypokemon, deleteMypokemon
}