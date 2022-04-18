import firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyCR1a33C3m1aL2ExOXYbUaf3l1dkkBgXN0",
//     authDomain: "testing-fullstack-fab6d.firebaseapp.com",
//     databaseURL: "https://testing-fullstack-fab6d-default-rtdb.firebaseio.com",
//     projectId: "testing-fullstack-fab6d",
//     storageBucket: "testing-fullstack-fab6d.appspot.com",
//     messagingSenderId: "647767050133",
//     appId: "1:647767050133:web:fc25601304ac332cda989c"
//   };
//   firebase.initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyArxxj0hSggMz3mwKPZFbhMHQDmITslCkA",
  authDomain: "fullstack-a81fc.firebaseapp.com",
  databaseURL: "https://fullstack-a81fc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fullstack-a81fc",
  storageBucket: "fullstack-a81fc.appspot.com",
  messagingSenderId: "574871871558",
  appId: "1:574871871558:web:4abd97695ba23f1241ea47"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase;