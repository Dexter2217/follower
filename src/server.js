const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const querystring = require('querystring');
const app = express();
const cookieParser = require('cookie-parser');
//const { CLIENT_ID, CLIENT_SECRET } = require('./credentials.js');
const credentials = require('./credentials.js');
const stateKey = "spotify_auth_state";

//import {CLIENT_ID} from "./credentials.mjs";
console.log(__dirname);
//app.use(express.static(path.join(__dirname, 'public')).use(cors()));

var generateStateString = () => {
    var randArray = [];
    for (i=0; i<5; i++) {
        randArray.push(Math.floor(Math.random() * 10));
    }
    return randArray.join("");
}
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))
   .use(cors());

app.get('/ping', function (req, res) {
    console.log("pong from console");
    console.log("pong request object");
    console.log(req.cookies);
return res.send('pong');
});

app.get('/login', function (req, res) {
    var scope = "user-read-private user-read-email user-follow-read";
    var state = generateStateString();
    res.cookie(stateKey, state);
    res.redirect('http://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: credentials.CLIENT_ID,
        scope: scope,
        redirect_uri: 'http://localhost:8081/callback',
        state: state
    }))
});

app.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state;
    console.log("Inside /callback, request object is");
    console.log(req);
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log(`state is ${state} and storedstate is ${storedState}`);
    if (state === null || state !== storedState) {
        res.redirect("/#?" + 
        querystring.stringify({
            error: "state mismatch"
        }));
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: 'http://localhost:8081/callback',
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(credentials.CLIENT_ID + ':' + credentials.CLIENT_SECRET).toString('base64'))
            },
            json: true
        };
        
    
        request.post(authOptions, function (error, response, body) {
            var access_token,
                refresh_token;
            // console.log("body is");
            // console.log(body);
            // console.log("response is");
            // console.log(response);
            if (!error && response.statusCode === 200) {
                access_token = body.access_token;
                refresh_token = body.refresh_token;
                res.cookie('access-token', access_token);
                res.cookie('refresh-token', refresh_token);
                res.redirect('http://localhost:3000?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            }
        });
    }
});

app.get('/refresh', function (req, res) {
    //Make the token refresh call
    console.log("Begin /refresh");
    console.log("request object is");
    console.log(req.cookies);
    var currentRefreshToken = req.cookies['refresh-token'],
        refreshOptions;
    console.log(currentRefreshToken);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000" );
    res.header("Access-Control-Allow-Credentials", "true");
    if (!currentRefreshToken) {
        console.log("currentRefreshToken is false");
        res.status(401).send("Invalid access token");
    } else {
        console.log("currentRefreshToken is true");
        refreshOptions = {
            headers: { 
                'Authorization': 'Basic ' + (new Buffer(credentials.CLIENT_ID + ':' + credentials.CLIENT_SECRET).toString('base64'))
            },
            url: "https://accounts.spotify.com/api/token",
            form: {
                grant_type: "refresh_token",
                refresh_token: currentRefreshToken
            },
            json: true
        };
        //console.log("request is...");
        //console.log(request);
        request.post(refreshOptions, function (error, response, body) {
            console.log("request.post has been initiated");
            if (error) {
                console.log("error is %o", error);
                res.status(500).send("System Error. Please try again later.");
            } else {
                console.log("refresh body is %o", body);
                console.log("refresh response is %o", response);
                var sendObj = {
                    access_token: body.access_token,
                    refresh_token: body.refresh_token,
                    expires_in: body.expires_in
                };
                 //Set the new access token to the access_token cookie.
                res.cookie('access-token', sendObj.access_token);
                res.cookie('refresh-token', sendObj.refresh_token);
                console.log("Will be sending %o", sendObj);
                res.send(sendObj);
            }
        });
    }
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
console.log("Server is running on port 8081");
app.listen(process.env.PORT || 8081);