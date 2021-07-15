"use strict";
exports.__esModule = true;
var express = require("express");
// var path = require('path');
var path = require("path");
// const { Firestore } = require('@google-cloud/firestore');
var firestore_1 = require("@google-cloud/firestore");
var app = express();
var PORT = 3000;
var progress = new Array(30);
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
