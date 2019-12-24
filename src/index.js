import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Login from './components/Login';
//import FollowedArtists from './components/Followed_Artists';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';
import promise from 'redux-promise';
import reducers from "./reducers";
import thunk from 'redux-thunk';
import { BrowserRouter, Route} from "react-router-dom";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route path="/" component={App}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<FollowedArtists />, document.getElementById('followed_artists'));
//registerServiceWorker();
