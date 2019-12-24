import {combineReducers} from "redux";
import FollowedArtistsReducer from "./reducer_followed_artists";
import CurrentArtistReducer from "./reducer_current_artist";

const rootReducer = combineReducers({
    followedArtists: FollowedArtistsReducer,
    currentArtist: CurrentArtistReducer
});

export default rootReducer;

