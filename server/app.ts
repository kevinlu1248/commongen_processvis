import * as express from 'express';
// var path = require('path');
import * as path from 'path';
// const { Firestore } = require('@google-cloud/firestore');
import { Firestore } from '@google-cloud/firestore';
const app = express();
const PORT = 3000;

interface ProgressItem {
  done: number;
  lock: 'not started' | 'in progress' | 'completed';
}
interface ProgressType extends Array<ProgressItem> {}
let progress: ProgressType = new Array<ProgressItem>(30);

const collection = new Firestore().collection('progress');
const getNewData = () =>
  collection
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((documentSnapshot) => {
        progress[parseInt(documentSnapshot.ref.id)] = <ProgressItem>(
          documentSnapshot.data()
        );
      })
    )
    .catch(console.log);
getNewData();
setTimeout(getNewData, 30 * 1000);

app.use(express.static(__dirname + '/../public/'));

app.get('/', (_req, res) =>
  res.sendFile(path.resolve(__dirname + '/../public/index.html'))
);

app.post('/progress', (_req, res) => {
  res.json(progress);
  console.log('progress!');
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
