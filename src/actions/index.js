import axios from "axios";

//Declare constants that will be the 'type' in each actionCreator sent by functions
//defined in this file

export const FETCH_FOLLOWED_ARTISTS = "fetch_followed_artists";
export const FETCH_FOLLOWED_ARTISTS_ERROR = "fetch_followed_artists_error";
export const SET_CURRENT_ARTIST = "set_current_artist";

const ROOT_URL = "https://api.spotify.com/v1/me";
const cookies = require('js-cookie');

async function getFollowedResponseApi (access_token) {
    var config = {
        url: "/following",
        method: "get",
        baseURL: ROOT_URL,
        params: {
            type: "artist",
            limit: 50
        },
        headers: {"Authorization": "Bearer " + access_token}
    },
    response = {},
    fullArtistList = [];

    do {
        response = await axios(config);
        fullArtistList = [...response.data.artists.items, ...fullArtistList];
        config.params.after = response.data.artists.cursors.after;
    } while (response.data.artists.cursors.after !== null);

    return fullArtistList;
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

export function selectArtist (artist) {
    return {
        type: SET_CURRENT_ARTIST,
        payload: artist
    }
}