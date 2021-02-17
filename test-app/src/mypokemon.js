import React, { Component } from "react";

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
                            const {nickname, urlnum} = item;
                            const pokeName = item.name.toUpperCase();
                            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urlnum}.png`;
                                 
                            return (
                                <div key={nickname} className="bgCircle">
                                    <center><img src={urlImg} className="circle"/></center>
                                    <div className="ctr">
                                        {pokeName}
                                    </div>
                                    <div className="ctr">
                                        Nickname : {nickname}
                                    </div>
                                    <center><button className="catchBtn" onClick={() => {
                                        fetch(`http://localhost:3000/api/v1/mypokemon/${nickname}`, {method: 'DELETE'})
                                        .then(async response => {
                                            const data = await response.json();
                                            console.log(data);
                                            if (!response.ok) {
                                                const error = (data && data.message) || response.status;
                                                return Promise.reject(error);
                                            }
                                        })
                                        .catch(error => {
                                            console.error('There was an error!', error);
                                        });
                                        setTimeout("location.reload(true);",500);
                                    }}>X</button></center>
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