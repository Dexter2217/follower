import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import './index.css';
import App from './App';
import FollowedArtists from './components/Followed_Artists';
//import registerServiceWorker from './registerServiceWorker';
import promise from 'redux-promise';
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <div>
            <App />
            <FollowedArtists />
        </div>
    </Provider>,
    document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<FollowedArtists />, document.getElementById('followed_artists'));
//registerServiceWorker();
