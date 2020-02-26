import {combineReducers} from "redux";
import FollowedArtistsReducer from "./reducer_followed_artists";
import CurrentArtistReducer from "./reducer_current_artist";
import CurrentPageReducer from './reducer_current_page';
import CurrentSearchTermReducer from './reducer_current_search_term';

const rootReducer = combineReducers({
    followedArtists: FollowedArtistsReducer,
    currentArtist: CurrentArtistReducer,
    currentPage: CurrentPageReducer,
    currentSearchTerm: CurrentSearchTermReducer
});

export default rootReducer;

