import {combineReducers} from "redux";
import FollowedArtistsReducer from "./reducer_followed_artists";
import CurrentArtistReducer from "./reducer_current_artist";
import CurrentPageReducer from './reducer_current_page';

const rootReducer = combineReducers({
    followedArtists: FollowedArtistsReducer,
    currentArtist: CurrentArtistReducer,
    currentPage: CurrentPageReducer
});

export default rootReducer;

