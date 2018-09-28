import axios from "axios";

//Declare constants that will be the 'type' in each actionCreator sent by functions
//defined in this file

export const FETCH_FOLLOWED_ARTISTS = "fetch_followed_artists";

const ROOT_URL = "https://api.spotify.com/v1/me";
//const queryString = require("query-string");
//const queryString = require('querystring');
const cookies = require('js-cookie');

export function fetchFollowedArtists () {
    //Make axios API call
    console.log("cookies is in index.js...");
    console.log(cookies);
    let access_token = cookies.get('access-token');
    console.log("Access token is");
    console.log(access_token);
    var scope = "user-follow-read";
    let config = {
        url: "/following",
        method: "get",
        baseURL: ROOT_URL,
        params: {
            type: "artist"
        },
        headers: {"Authorization": "Bearer " + access_token}
    }
    let followedArtistsUrl = ROOT_URL + "/following";
    let request = axios(config);

    //Return actionCreator object that gets sent to the reducer
    return {
        type: FETCH_FOLLOWED_ARTISTS,
        payload: request
    };
}