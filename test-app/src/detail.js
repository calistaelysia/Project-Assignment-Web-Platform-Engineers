import React, { Component } from  "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Index from "./index.js";
import Main from "./main.js";
import ReactDOM from "react-dom";

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            moves: [],
            types: [],
            height: 0,
            weight: 0,
            isLoaded: false,
        }
    }
    componentDidMount() {
        this.setState({...this.state, isLoaded: true});
        const { urlNum } = this.props.match.params;
        fetch(`https://pokeapi.co/api/v2/pokemon/${urlNum}/`)
        .then(res => {
            return res.json();
        })
        .then(result => this.setState({
            name: result.name,
            moves: result.moves,
            types: result.types,
            height: result.height,
            weight: result.weight,
            isLoaded: false,
        }))
        .catch(error => console.log('parsing failed', error))
    }
    render(){
        const moves = this.state.moves;
        const height = this.state.height;
        const weight = this.state.weight;
        const types = this.state.types;
        const namePoke = this.state.name;

        const name = namePoke.toUpperCase();
        console.log(name);
        const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.match.params.urlNum}.png`;
        return(
            <div id="detailContainer">
                <div><button to="/" className="backBtn" onClick={() => this.props.history.goBack()}>Back</button></div>
                <center><img src={urlImg} className="detailCircle"/></center>
                <center>
                    <Popup
                        trigger={<button className="catchBtn"> Catch </button>}
                        modal
                        nested
                        >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Catch a Pokemon </div>
                                <div className="content">
                                    <div>Give it a nickname :</div>
                                    <div><input type="text" name="nickname" id="nickname"/></div>
                                </div>
                                <div className="actions">
                                    <button
                                    className="catchBtn"
                                    onClick={() => 
                                    {
                                        const requestOptions = {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({ nickname: document.getElementById("nickname").value, name: namePoke, urlnum: this.props.match.params.urlNum})
                                        };
                                        console.log(requestOptions.body);
                                        if(Math.random() >= 0.5){
                                            fetch('http://localhost:3000/api/v1/mypokemon/', requestOptions)
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
                                        }
                                        else{
                                            alert("Sorry, catch failed..");
                                        }
                                        close();
                                    }}
                                    >
                                    Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </center>
                <div className="detailName">
                    <h3>{name}</h3>
                </div>
                <div className="charDetail">
                    <div>
                        <div>Height</div>
                        <div>{height}</div>
                    </div>
                    <div>
                        <div>Weight</div>
                        <div>{weight}</div>
                    </div>
                </div>
                <div className="dataDetail">
                    <p>Types: </p>
                    <div className="gridDetail">
                        {
                            types.map(item => {
                                const typeName = item.type.name;
                                const typeUrl = item.type.url;
                                return (
                                    <li key={typeUrl}>{typeName}</li>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="dataDetail">
                    <p>Moves: </p>
                    <div className="gridDetail">
                        {
                            moves.map(item => {
                                const moveName = item.move.name;
                                const moveUrl = item.move.url;
                                return (
                                    <li key={moveUrl}>{moveName}</li>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;