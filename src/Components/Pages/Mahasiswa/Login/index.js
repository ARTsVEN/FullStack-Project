import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";


const Login =() => {
    const [noReg, setNoReg] = useState ("");
    const [password, setPassword] = useState ("");

    let history = useHistory ();

    const handleSubmit = () => {
        const data = {
            noReg: noReg,
            password: password,
        };
        console.log (data);
        //login method
        firebase.auth().signInWithEmailAndPassword(noReg,password)
        .then((res) => history.push('/'))
        .catch((error) => console.log ("Error"))
        
        //Refresh Data
        setNoReg('');
        setPassword('');
    };

    return (
        <div className="container">
            <h2 >Sistem Pengurusan Status Village Dean</h2>
            <h5>Login Mahasiswa</h5>
            <br/>
                <input 
                className="form-control"
                placeholder="Nomor Registrasi" 
                value={noReg} 
                onChange={(e) => setNoReg(e.target.value)}/>
            <br/>
            <br/>
                <input 
                className="form-control"
                placeholder="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <br/>
            <button type="button" onClick={handleSubmit} class="btn btn-secondary">
                Login
            </button>
        </div>
    )
}

export default Login;