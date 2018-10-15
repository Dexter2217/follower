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
// const CLIENT_ID = "";
// const CLIENT_SECRET = "";
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
        redirect_uri: 'http://localhost:8080/callback',
        state: state
    }))
});

app.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state;
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
                redirect_uri: 'http://localhost:8080/callback',
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(credentials.CLIENT_ID + ':' + credentials.CLIENT_SECRET).toString('base64'))
            },
            json: true
        };
        
    
        request.post(authOptions, function (error, response, body) {
            console.log("body is");
            console.log(body);
            console.log("response is");
            console.log(response);
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                refresh_token = body.refresh_token;
                res.cookie('access-token', access_token);
    
                res.redirect('http://localhost:3000?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            }
        });
    }
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
console.log("Server is running on port 8080");
app.listen(process.env.PORT || 8080);