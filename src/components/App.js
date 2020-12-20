import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
const cookies = require('js-cookie');

class App extends Component {
    getAccessToken () {
        return cookies.get('access-token');
    }

    render () {
        if (this.getAccessToken()) {
            return <Dashboard />;
        } else {
            return <Login />;
        }
    }
}

export default App;