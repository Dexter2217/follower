import {combineReducers} from "redux";
import FollowedArtistsReducer from "./reducer_followed_artists";

const rootReducer = combineReducers({
    followedArtists: FollowedArtistsReducer
});

export default rootReducer;

