import React, { useState, useEffect } from "react";
import firebase from '../../../Config/Firebase'
import {useHistory} from "react-router-dom";
import Header from "../../../Molecules/Header";

const Login = ({ title, angka }) => {
  const [welcomeText, setWelcomeText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
    
  useEffect(() => {
    console.log("component did mount");
  }, []);

  useEffect(() => {
    console.log("component did update");
  }, [welcomeText, email, password]);

  const handleSubmit = () => {
    setWelcomeText("");
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    //Check apakah akun adalah student atau operator
    firebase.auth().signInWithEmailAndPassword(email+"@unklab.ac.id", password).then(userCredential => {
      const dbRef = firebase.database().ref();
    dbRef.child("studentAcc").child(userCredential.user.uid).get().then((snapshot) => {
      if (snapshot.exists()) {

        console.log(snapshot.val());
        firebase.auth().signInWithEmailAndPassword(email+"@unklab.ac.id", password)
        .then(res => history.push(`/dashboard`))
        .catch((error)=> console.log("Error!",error))

      } else {
        console.log("Operator");
        firebase.auth().signInWithEmailAndPassword(email+"@unklab.ac.id", password)
        .then(res => history.push(`/approving`))
        .catch((error)=> console.log("Error!",error))

      }
    }).catch((error) => {
      console.error(error);
    });
    })
  };

  return (
    //JSX
    <div style={{backgroundSize:'cover',minHeight:'100vh',
    backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}}>
    <Header />
    <div  className="col-md-4 shadow p-3 card container mt-5">
       
      <h3>{welcomeText}</h3>
      <h1>
        {title} {angka}
        Login
      </h1>
      <p className="form-label mt-5">No ID</p>
      <input
        className="form-control"
        placeholder="Masukan nomor ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="form-label mt-3">Password</p>
      <input
        className="form-control"
        placeholder="Masukan password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        Login
      </button>
      <br></br>
      <br></br>
    </div>
    </div>
  );
};


export default Login;