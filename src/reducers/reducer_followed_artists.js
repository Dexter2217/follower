import { FETCH_FOLLOWED_ARTISTS } from "../actions";

export default function (state = "", action) {
    switch(action.type) {
        case FETCH_FOLLOWED_ARTISTS:
            console.log("In FETCH_FOLLOWED_ARTISTS reducer");
            return action.payload;
        default:
            return state;
    }
}