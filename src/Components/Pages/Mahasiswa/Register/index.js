import React, { useState } from 'react'
import firebase from '../../../Config/Firebase';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [noReg, setNoReg] = useState ("");
    const [name, setName] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] =useState ("");

    let history= useHistory ();

    const onSubmit = () => {

        const dataMahasiswa = {
            noReg:noReg,
            name : name,
            email : email,
            password : password,
        
        }

        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          const userId = userCredential.user.uid;
          // ...
          console.log(userCredential)
            //Save to Realtime Db
            firebase.database().ref('users/' + userId).set({
                dataMahasiswa
            });
        
        //Refresh Data
        setNoReg ('')
        setEmail ('')
        setName ('')
        setPassword ('')

        //redirect ke login
        history.push("/login")
        })
        .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
          // ..
          console.log(error)
        });
        
        // const dataMahasiswa = {
        //     noReg:noReg,
        //     name : name,
        //     email : email,
        //     password : password,
        // };
        // console.log(dataMahasiswa);
    };


  return (
    <div >
                    <h2>Sistem Pengurusan Status Village Dean</h2>
            <h5>Registrasi Mahasiswa</h5>
            <br/>
            <br/>
            <p>Nama Mahasiswa</p>
                <input 
                className="form-control"
                placeholder="Masukkan Nama Mahasiswa" 
                value={name} 
                onChange={(e) => setName(e.target.value)}/>
            <br/>
            <br/>
            <br/>
            <p>Email</p>
                <input 
                className="form-control"
                placeholder="Masukkan Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <br/>
            <p>Nomor Registrasi</p>
                <input 
                className="form-control"
                placeholder="Masukkan Nomor Registrasi" 
                value={noReg} 
                onChange={(e) => setNoReg(e.target.value)}/>
            <br/>
            <br/>
            <p>Password</p>
                <input 
                className="form-control"
                placeholder="Masukkan Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <br/>
            <button type="button" onClick={onSubmit} class="btn btn-secondary">
                Register
            </button>
    </div>
  )
}

export default Register;