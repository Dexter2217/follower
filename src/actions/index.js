import axios from "axios";

//Declare constants that will be the 'type' in each actionCreator sent by functions
//defined in this file

export const FETCH_FOLLOWED_ARTISTS = "fetch_followed_artists";

const ROOT_URL = "https://api.spotify.com/v1/me";
//const queryString = require("query-string");
//const queryString = require('querystring');
const cookies = require('js-cookie');

async function getRefreshToken (successCallback, failureCallback) {
    debugger;
    var refreshConfig = {
        url: "/refresh",
        baseURL: "http://localhost:8080/",
        method: "get"
    }

    try {
        var response = await axios(refreshConfig);
    } catch (error) {
       return failureCallback(error);
    }
    
    successCallback(response);
}

function showError (error) {
    console.log("showError called. %o", error);
    return false;
}

async function retryGetFollowed () {
    let access_token = cookies.get('access-token');
    let config = {
        url: "/following",
        method: "get",
        baseURL: ROOT_URL,
        params: {
            type: "artist"
        },
        headers: {"Authorization": "Bearer " + access_token}
    }

    try {
        var response = await axios(config);
    } catch (error) {
        console.log("complete failure. dispatch the error");
        //dispatch action creator type that displays an error message on in the HTML
        return false;
    }

    return {
        type: FETCH_FOLLOWED_ARTISTS,
        payload: response
    };
}
export function fetchFollowedArtists () {
    //Make axios API call
    console.log("cookies is in index.js...");
    console.log(cookies);
    let access_token = cookies.get('access-token');
    console.log("Access token is");
    console.log(access_token);
    var scope = "user-follow-read";
    let config = {
        url: "/followin",
        method: "get",
        baseURL: ROOT_URL,
        params: {
            type: "artist"
        },
        headers: {"Authorization": "Bearer " + access_token}
    }
    let followedArtistsUrl = ROOT_URL + "/following";
    //let request = axios(config);

    //Return actionCreator object that gets sent to the reducer
    // return {
    //     type: FETCH_FOLLOWED_ARTISTS,
    //     payload: request
    // };

    return async dispatch => {
        var onSuccess = (response) => {
            dispatch({type: FETCH_FOLLOWED_ARTISTS, payload: response});
            return response;
        }

        var onError = (error) => {
            console.log("some API failure, %o", error);
            //Call function that makes the /token POST call. That function either makes another /following GET or dispatches an error.
            getRefreshToken(retryGetFollowed, showError);
        }
        try {
            var response = await axios(config);
        } catch (error) {
            return onError(error);
        }
        return onSuccess(response);
    }
}