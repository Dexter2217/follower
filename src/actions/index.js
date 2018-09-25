import axios from "axios";

//Declare constants that will be the 'type' in each actionCreator sent by functions
//defined in this file

export const FETCH_FOLLOWED_ARTISTS = "fetch_followed_artists";

const ROOT_URL = "";
const queryString = require("query-string");

export function fetchFollowedArtists () {
    //Make axios API call
    let parsed = queryString.parse(window.location.search);
    console.log("queryString parsed is");
    console.log(parsed);
    let followedArtistsUrl = ROOT_URL + "";
    let request = axios.get(followedArtistsUrl);

    //Return actionCreator object that gets sent to the reducer
    return {
        type: FETCH_FOLLOWED_ARTISTS,
        payload: request
    };
}