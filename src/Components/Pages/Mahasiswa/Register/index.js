import React, {useState} from 'react'
import firebase from 'firebase';
import {useHistory, Link} from "react-router-dom";
import Header from '../../../Molecules/Header';
// import NavBar from '../../molecules/NavBar';


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    let history = useHistory();
    const onLogin = () => history.push('/login');

    const onSubmit = () => {

        const data = {
            email: email,
            fullName: fullName,
        }

  firebase
  .auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    //simpan ke realtime database
    const userID = userCredential.user.uid;
    firebase
    .database()
    .ref('OperatorAcc/' + userID)
    .set(data);

    setFullName("");
    setEmail("");
    setPassword("");    
    //redirect ke halaman login
    history.push("/login");
    console.log(userCredential)
  })
  .catch((error) => {
    console.log(error);
    //tampilkan pesan error 
  });
    };

    return (
        <div style={{ minHeight:'100vh',
          backgroundImage: `url("http://www.questarai.com/wp-content/uploads/2016/10/fullwidth-header-background-image-1080x720.png")`}}>
        <Header />
        <div className ="col-md-4 shadow p-3 card container mt-3">
        <h1 className="container mt-4">Register Account</h1>
        <p className="form-label mt-4">Nama Lengkap</p>
      <input
        className="form-control"
        placeholder="Masukan nama Lengkap"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
        <p className="form-label mt-3">Email</p>
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
      <button type="button" onClick={onSubmit} className="btn btn-success">
        Buat Akun Baru
      </button>
      <br></br>
      <br></br>
      <button className="btn btn-warning" onClick={onLogin}>
        Sudah Punya Akun
        </button>
      </div>
        </div>
    )
}

export default Register;
