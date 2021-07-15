import * as express from 'express';
import * as path from 'path';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
const app = express();
const PORT = 3000;

interface ProgressItem {
  done: number;
  lock: 'not started' | 'in progress' | 'completed';
}
interface ProgressType extends Array<ProgressItem> {}
let progress: ProgressType = new Array<ProgressItem>(30);

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://commongen-69aef.firebaseio.com"
});

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
