import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import Detail from "./detail.js";
import ReactDOM from "react-dom";


class Mypokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonCount: [],
            isLoaded: false,
        };
    }
    componentDidMount() {
        this.setState({...this.state, isLoaded: true});
        // fetch database get mypokemon
        fetch("http://localhost:3000/api/v1/mypokemon", {method: 'get'})
        .then(res => {
            return res.json();  
        })
        .then(datas => datas.results.map(data => (
            {
                nickname: `${data.nickname}`,
                name: `${data.name}`,
                urlnum: `${data.urlnum}`,
            }
        )))
        .then(items => this.setState({
            pokemonCount:items,
            isLoaded: false,
        }))
        .catch(error => console.log('parsing failed', error));
    }
    
    render() {
        const pokemonCount = this.state.pokemonCount;
        console.log(pokemonCount);
        return (
            <div className="boxWhite">
                <h2>MY POKEMON</h2>
                <div className="container">
                    {
                        pokemonCount.length > 0 ? pokemonCount.map(item => {
                            const {nickname, name, urlnum} = item;
                            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urlnum}.png`;
                                 
                            return (
                                <div key={nickname} className="bgCircle">
                                    <center><img src={urlImg} className="circle"/></center>
                                    <div className="ctr">
                                        {nickname}
                                    </div>
                                    <div className="ctr">
                                        {name}
                                    </div>
                                </div>
                            );
                        }) : null
                    }
                </div>
            </div>
            
        );
    }
}

export default Mypokemon;