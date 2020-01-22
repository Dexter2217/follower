import {SET_CURRENT_PAGE} from '../actions';

export default function (state="", action) {
    switch(action.type){
        case SET_CURRENT_PAGE:
            return action.payload;
        default:
            return state;
    }
}