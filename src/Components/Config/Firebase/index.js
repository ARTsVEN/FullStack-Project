import firebase from "firebase";

const firebaseConfig = {
        apiKey: "AIzaSyArxxj0hSggMz3mwKPZFbhMHQDmITslCkA",
        authDomain: "fullstack-a81fc.firebaseapp.com",
        databaseURL: "https://fullstack-a81fc-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "fullstack-a81fc",
        storageBucket: "fullstack-a81fc.appspot.com",
        messagingSenderId: "574871871558",
        appId: "1:574871871558:web:4abd97695ba23f1241ea47"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;