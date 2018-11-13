import React, { Component } from 'react';
import FollowedArtists from './Followed_Artists';
import App from '../App';
const cookies = require('js-cookie');

class Authenticator extends Component {
    constructor () {
        super();
        this.access_token = cookies.get('access-token');
    }
    render () {
        if (this.access_token) {
            console.log("Render FollowArtists");
            return <FollowedArtists />;
        } else {
            console.log("Render App");
            return <App />;
        }
    }
}

export default Authenticator;