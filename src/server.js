const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const querystring = require('querystring');
const app = express();
const CLIENT_ID = "";
const CLIENT_SECRET = "";
console.log(__dirname);
//app.use(express.static(path.join(__dirname, 'public')).use(cors()));

app.use(express.static(path.join(__dirname, 'public')))
   .use(cors());

app.get('/ping', function (req, res) {
    console.log("pong from console");
return res.send('pong');
});

app.get('/login', function (req, res) {
    var scope = "user-read-private user-read-email";
    res.redirect('http://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: 'http://localhost:8080/callback'
    }))
});

app.get('/callback', function (req, res) {
    console.log("CALLBACK");
    var code = req.query.code || null;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:8080/callback',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
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

            res.redirect('http://localhost:3000/' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        }
    });
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
console.log("port is...");
console.log(process.env.PORT);
app.listen(process.env.PORT || 8080);