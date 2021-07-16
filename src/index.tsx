import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTBJPHpx7AQm4zyMTaz_a3hbtMa136ONE',
  authDomain: 'commongen-69aef.firebaseapp.com',
  projectId: 'commongen-69aef',
  storageBucket: 'commongen-69aef.appspot.com',
  messagingSenderId: '116431725659',
  appId: '1:116431725659:web:76a9ee1e2ec89fc2178b7e',
  measurementId: 'G-CSVS8ZS7SW',
};
firebase.initializeApp(firebaseConfig);
const collection = firebase.firestore().collection('progress');

ReactDOM.render(
  <App collectionRef={collection} />,
  document.getElementById('root')
);
