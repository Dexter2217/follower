import { FETCH_FOLLOWED_ARTISTS } from ".../actions";

export default function (state = "", action) {
    switch(action.type) {
        case FETCH_FOLLOWED_ARTISTS:
            return action.payload;
        default:
            return state;
    }
}