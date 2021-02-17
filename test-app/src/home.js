import React, { Component } from "react";
import Detail from "./detail.js";
import ReactDOM from "react-dom";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            pokemonCount: [],
            isLoaded: false,
        };
    }
    componentDidMount() {
        this.setState({...this.state, isLoaded: true});
        
        fetch("https://pokeapi.co/api/v2/pokemon")
        .then(res => {
            return res.json();
        })
        .then(datas => datas.results.map(data => (
            {
                name: `${data.name}`,
                url: `${data.url}`,
                ownNum: 0,
            }
        )))
        .then(items => this.setState({
            items: items,
            isLoaded: false,
        }))
        .catch(error => console.log('parsing failed', error));

        fetch("https://pokemondb-app.herokuapp.com/api/v1/pokemon", {method: 'GET'})
        .then(res => {
            return res.json();  
        })
        .then(datas => datas.results.map(data => (
            {
                ownNum: `${data.ownNum}`,
                name: `${data.name}`,
                urlNum: `${data.urlnum}`,
            }
        )))
        .then(items => this.setState({
            pokemonCount:items,
            isLoaded: false,
        }))
        .catch(error => console.log('parsing failed', error));
    }
    render() {
        const items  = this.state.items;
        const pokemonCount = this.state.pokemonCount;
        console.log(pokemonCount);
        return (
            <div className="boxWhite">
                <h2>POKEMON</h2>
                <div className="container">
                    {
                        items.length > 0 ? items.map(item => {
                            const {url} = item;

                            const urlSplit = url.split("/");
                            const urlNum = urlSplit[urlSplit.length - 2];
                            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urlNum}.png`;
                            const pokeName = item.name.toUpperCase();
                            const ownNumCount = pokemonCount.filter(p => urlNum == p.urlNum);
                            const pokeNum = ownNumCount.length > 0 ? ownNumCount[0].ownNum : 0;
                                 
                            return (
                                <button key={url} className="bgCircle" onClick={() => this.props.history.push(`detail/${urlNum}`)}>
                                    <center><img src={urlImg} className="circle"/></center>
                                    <div className="ctr">
                                        {pokeName}
                                    </div>
                                    <div className="ctr">
                                        Owned : {pokeNum}
                                    </div>
                                </button>
                            );
                        }) : null
                    }
                </div>
            </div>
            
        );
    }
}

export default Home;