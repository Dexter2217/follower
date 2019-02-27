import axios from "axios";
import { resolve } from "path";

//Declare constants that will be the 'type' in each actionCreator sent by functions
//defined in this file

export const FETCH_FOLLOWED_ARTISTS = "fetch_followed_artists";
export const FETCH_FOLLOWED_ARTISTS_ERROR = "fetch_followed_artists_error";

const ROOT_URL = "https://api.spotify.com/v1/me";
//const queryString = require("query-string");
//const queryString = require('querystring');
const cookies = require('js-cookie');

async function getRefreshToken (successCallback, failureCallback, dispatch) {
    debugger;
    var refreshConfig = {
        url: "/refresh",
        baseURL: "http://localhost:8081/",
        method: "get",
        withCredentials: true
    }

    try {
        var response = await axios(refreshConfig);
    } catch (error) {
       return failureCallback(error);
    }

    successCallback(response, dispatch);
}

function showError (error) {
    console.log("showError called. %o", error);
    return false;
}

async function retryGetFollowed (successResponse, dispatch) {
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
        console.log("response is");
        console.log(response);
        console.log("Now dispatching FETCH_FOLLOWED_ARTISTS in the retryGetFollowed function");
        dispatch({type: FETCH_FOLLOWED_ARTISTS, payload: response});
    } catch (error) {
        console.log("complete failure. dispatch the error");
        //dispatch action creator type that displays an error message on in the HTML
        return false;
    }
    console.log("Did I get here?");
    // return async dispatch => {
    //     console.log("dispatch is");
    //     console.log(dispatch);
    //     dispatch({type: FETCH_FOLLOWED_ARTISTS, payload: response});
    // };
}

export function fetchFollowedArtistsOld () {
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
            getRefreshToken(retryGetFollowed, showError, dispatch);
        }
        try {
            var response = await axios(config);
        } catch (error) {
            return onError(error);
        }
        return onSuccess(response);
    }
}

// const getFollowedResponse = new Promise((resolve, reject) => {
//     let access_token = cookies.get('access-token');
//     let config = {
//         url: "/followin",
//         method: "get",
//         baseURL: ROOT_URL,
//         params: {
//             type: "artist"
//         },
//         headers: {"Authorization": "Bearer " + access_token}
//     };
//     axios(config)
//     .then(response => {
//         resolve(response);
//     })
//     .catch(error => {
//         reject(error);
//     });
// });

async function getFollowedResponseApi (access_token) {
    var config = {
        url: "/followin",
        method: "get",
        baseURL: ROOT_URL,
        params: {
            type: "artist"
        },
        headers: {"Authorization": "Bearer " + access_token}
    };


    var response = await axios(config);
    return response;
}

async function refreshTokenApi () {
    var config = {
        url: "/refresh",
        baseURL: "http://localhost:8081/",
        method: "get",
        withCredentials: true
    }

    var response = await axios(config);
    return response;
}

async function attemptRefreshedRetry () {
    await refreshTokenApi();
    var access_token = cookies.get('access-token');
    return getFollowedResponseApi(access_token);
}

export function fetchFollowedArtists () {
    var access_token = cookies.get('access-token');
    return (dispatch) => {
        getFollowedResponseApi(access_token).then(function (response){
            console.log("Dispatching FETCH_FOLLOWED_ARTISTS...");
            dispatch({type: FETCH_FOLLOWED_ARTISTS, payload: response});
        }, function (response) {
            attemptRefreshedRetry().then(function (response) {
                console.log("Dispatching FETCH_FOLLOWED_ARTISTS after retry....");
                dispatch({type: FETCH_FOLLOWED_ARTISTS, payload: response});
            }, function (response) {
                console.log("Dispatching FETCH_FOLLOWED_ARTISTS_ERROR");
                dispatch({type: FETCH_FOLLOWED_ARTISTS_ERROR, payload: response});
            })
        });
    }
}