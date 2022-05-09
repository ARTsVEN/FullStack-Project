import firebase from "firebase";

const firebaseConfig = {
            apiKey: "AIzaSyD0DojhH-3tvO1vftATZUVPZzUf9TtwtQE",
            authDomain: "fullstacklast.firebaseapp.com",
            databaseURL: "https://fullstacklast-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "fullstacklast",
            storageBucket: "fullstacklast.appspot.com",
            messagingSenderId: "548622165026",
            appId: "1:548622165026:web:0fcb907d82c411f144967b"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;