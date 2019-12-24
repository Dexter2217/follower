import { SET_CURRENT_ARTIST } from "../actions";
const initialState = {
    genres: []
};
export default function (state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_ARTIST:
            return action.payload;
        default:
            return state;
    }
}