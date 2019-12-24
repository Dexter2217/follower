import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
const cookies = require('js-cookie');

class App extends Component {
    constructor () {
        super();
        this.access_token = cookies.get('access-token');
    }
    render () {
        if (this.access_token) {
            return <Dashboard />;
        } else {
            return <Login />;
        }
    }
}

export default App;