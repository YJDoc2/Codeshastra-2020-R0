import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import Card from './Card';
import Upload from './upload';
import V_Home from './v_home';
import Axios from 'axios';
import NavBar from './navbar';
import homepage from './homepage';
import NGO from './NGO';
import NGO_Home from './ngo_home';
class RootRouter extends Component {
    state = {
        user: null,
        isLoggedIn: false
    };

    componentDidMount() {
        Axios.defaults.withCredentials = true;
    }

    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={homepage} />
                    <Route exact path='/ngo_home' component={NGO_Home} />
                    <Route exact path='/NGO' component={NGO} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/v_home' component={V_Home} />
                    <Route path='/upload' component={Upload} />
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;
