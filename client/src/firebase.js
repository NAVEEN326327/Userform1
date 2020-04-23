import firebase from 'firebase';

const config ={
    apiKey: "AIzaSyAJ3pEe7bwKXisZffZmYl6XtaPYl9TGM_w",
    authDomain: "login-react-18ec7.firebaseapp.com",
    databaseURL: "https://login-react-18ec7.firebaseio.com",
    projectId: "login-react-18ec7",
    storageBucket: "login-react-18ec7.appspot.com",
    messagingSenderId: "141321463477",
    appId: "1:141321463477:web:41e36da823066b09e840fc"

}

firebase.initializeApp(config);
export default firebase;