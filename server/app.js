"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var firestore_1 = require("@google-cloud/firestore");
var admin = require("firebase-admin");
var app = express();
var PORT = 3000;
var progress = new Array(30);
admin.initializeApp({
    credential: admin.credential.cert({
        "projectId": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: "https://commongen-69aef.firebaseio.com"
});
var collection = new firestore_1.Firestore().collection('progress');
var getNewData = function () {
    return collection
        .get()
        .then(function (querySnapshot) {
        return querySnapshot.forEach(function (documentSnapshot) {
            progress[parseInt(documentSnapshot.ref.id)] = (documentSnapshot.data());
        });
    })["catch"](console.log);
};
getNewData();
setTimeout(getNewData, 30 * 1000);
app.use(express.static(__dirname + '/../public/'));
app.get('/', function (_req, res) {
    return res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});
app.post('/progress', function (_req, res) {
    res.json(progress);
    console.log('progress!');
});
app.listen(PORT, function () {
    return console.log("App listening at http://localhost:" + PORT);
});
