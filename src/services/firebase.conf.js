
import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDKJ0dmRDxXVc-zUHd8XPHZ-zbFMK0dSk8",
    authDomain: "mega-hack-vtex.firebaseapp.com",
    databaseURL: "https://mega-hack-vtex.firebaseio.com",
    projectId: "mega-hack-vtex",
    storageBucket: "mega-hack-vtex.appspot.com",
    messagingSenderId: "578307744702",
    appId: "1:578307744702:web:aa97656a5f97c986554fef"
};
// Initialize Firebase
const firebaseApi = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebaseApi;
