import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAwzngyYza1MuQK5NK4GaP4vLny2Ul8k8I",
    authDomain: "asad-894ac.firebaseapp.com",
    databaseURL: "https://asad-894ac.firebaseio.com",
    projectId: "asad-894ac",
    storageBucket: "asad-894ac.appspot.com",
    messagingSenderId: "216424420625",
    appId: "1:216424420625:web:f6221d1d5cda629dcf28b0",
    measurementId: "G-4EYNRRSS12"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth();
  firebase.firestore();


  export default firebase;