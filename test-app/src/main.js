import React, { Component } from "react";
import { Route, Switch, NavLink, HashRouter, Link, useParams, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Mypokemon from "./mypokemon";
import Detail from "./detail";
import PokemonImg from "./img/pokemongo.jpg";

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="pageContent">
                    <div id="hdr"></div>
                    <div id="navbar">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/mypokemon">My Pokemon</NavLink></li>
                    </div>
                    <div id="content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/mypokemon" component={Mypokemon}/>
                            <Route path="/detail/:urlNum" component={Detail}/>
                        </Switch>
                    </div>
                </div>
                <div id="ftr">@Copyright2021</div>
            </BrowserRouter>
        );
    }
}

export default Main;