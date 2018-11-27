import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import './index.css';
import App from './App';
import FollowedArtists from './components/Followed_Artists';
import Authenticator from './components/Authenticator';
//import registerServiceWorker from './registerServiceWorker';
import promise from 'redux-promise';
import reducers from "./reducers";
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route path="/" component={Authenticator}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<FollowedArtists />, document.getElementById('followed_artists'));
//registerServiceWorker();
