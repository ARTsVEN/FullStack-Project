import React, { useState, useEffect } from "react";
import firebase from '../../../Config/Firebase'
import {useHistory} from "react-router-dom";
import Header from "../../../Molecules/Header";

const Login = ({ title, angka }) => {
  const [welcomeText, setWelcomeText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const onRegis = () => history.push('/register');
    
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
    // console.log(data);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => history.push("/input"))
    .catch((error)=> console.log("Error!",error))
  };

  return (
    //JSX
    <div style={{ minHeight:'100vh',
      backgroundImage: `url("http://www.questarai.com/wp-content/uploads/2016/10/fullwidth-header-background-image-1080x720.png")`}}>
    <Header />
    <div  className="col-md-4 shadow p-3 card container mt-5">
       
      <h3>{welcomeText}</h3>
      <h1>
        {title} {angka}
        Login
      </h1>
      <p className="form-label mt-5">Email</p>
      <input
        className="form-control"
        placeholder="Masukan email"
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
      <button type="button" onClick={onRegis} className="btn btn-warning mb-5">
        Buat Akun
      </button>
    </div>
    </div>
  );
};


export default Login;