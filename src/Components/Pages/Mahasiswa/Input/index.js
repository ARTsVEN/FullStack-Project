import React, { useState, useEffect } from 'react';
import firebase from '../../../Config/Firebase';
import NavBar from '../../../Molecules/NavBar';
import {useHistory} from "react-router-dom";

const Input = () => {

        const [nama, setNama] = useState("")
        const [nim, setNim] = useState("")
        const [gambar, setGambar] = useState("")
        const [product, setProduct] = useState ([])
        const [button, setButton] = useState("Submit");
        const [selectedProduct, setSelectedProduct] = useState({});
        const [alamat, setAlamat] = useState("")
        const [keterangan, setKeterangan] = useState("");
        const [statusTinggal, setStatusTinggal] = useState("");
        const [tipeTinggal, setTipeTinggal] = useState("");
        const [users, setUsers] = useState("");

        let history = useHistory();
        
        const getUserProfile = () => {
            let userID = firebase.auth().currentUser;
            if (userID!=null)
            {
              userID = userID.uid;
              console.log(userID);
              firebase
              .database()
              .ref(`studentAcc/${userID}`)
              .on('value', res => {
              if(res.val()) {
                setUsers(res.val());
                setNama(res.val().fullName)
              }
            });
            }
          };

          useEffect(() => {
            getUserProfile();
            setTimeout(()=>{
              getUserProfile();
            },1000)
            // console.log(users);
            console.log(users.status)
            console.log(users.fullName)
          }, []);
        
    const handleGambar = e => {
            const reader = new
            FileReader();
            reader.onloadend = function (){
                setGambar(reader.result);
            };
            reader.readAsDataURL(e);
        };

        const resetForm = () => {
            setNama("")
            setNim("")
            setGambar("")
            setAlamat("")
            setButton("Submit")
            setSelectedProduct("")
            setKeterangan("");
            setStatusTinggal();
            setTipeTinggal();
            
        }

        const onSubmit = () => {
            const data = {
                nama: nama,
                nim: nim,
                gambar: gambar,
                alamat: alamat,
                keterangan: keterangan,
                statusTinggal: statusTinggal,
                tipeTinggal: tipeTinggal,
                email: users.email,
                fullName: users.fullName,
                // status: users.status,
            };
            const userzData = {
                email: users.email,
                fullName: users.fullName,
                status: "Pending",
            };
            
            let userID = firebase.auth().currentUser;

            // users.status="Pending"
            console.log(data)
            console.log(users.email,"ini email")
            console.log("ini userid   : ",userID.uid)
            if(users.status!='Approved' && users.status!='Pending'){
                
                if(button === 'Submit'){
                    // insert
                    firebase.database().ref(`dataReq/${userID.uid}`).push(data);
                    firebase.database().ref(`studentAcc/${userID.uid}`).set(userzData);
                }else{
                    // update
                    firebase.database().ref(`dataReq/${selectedProduct.id}`).set(data);
                }
                //bersihkan data di form
                resetForm();
            }
            else{
                console.log(`Tidak bisa, user dengan email ${users.email} sudah melakukan request atau sudah di approve`)
                }    
            }
        
    return (
		<div style={{backgroundSize: 'cover',minHeight:'100vh',
        backgroundImage: `url("https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")`}}>
			{/* <Header /> */}
			<NavBar />
		
        <div>
        
            <div style={{backgroundSize : 'cover',minHeight:'100vh',
      backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}}className="container mt-5">
            <h2 className='mt-3'>Input Data</h2>
            <div className='row justify-content-evenly'>
            <div style={{color:'#000000'}}className="col-8 mt-5">
                <p className="">Nama</p>
                <input className="form-control" 
                placeholder="Masukkan Nama" 
                value={nama} 
                onChange={(e)=>setNama(e.target.value)}
                />
                <br></br>
                <p>NIM</p>
                <input className="form-control" 
                placeholder="Masukkan NIM" 
                value={nim} 
                onChange={(e)=>setNim(e.target.value)}
                />
                <br></br>
                <p>Alamat</p>
                <input className="form-control" 
                placeholder="Masukkan Alamat" 
                value={alamat} 
                onChange={(e)=>setAlamat(e.target.value)}
                />  
                <br />
                <p>Keterangan / Alasan</p>
                <input className="form-control" 
                placeholder="Masukkan Keterangan" 
                value={keterangan} 
                onChange={(e)=>setKeterangan(e.target.value)}
                />  
                <br />
                <p>Image</p>
                <input className="form-control" 
                type="file"
                id="gambar"
                onChange={e => handleGambar(e.target.files[0])}
                />
                <hr />
                <button className="btn btn-primary mb-5" onClick={onSubmit}>{button}</button> 
                {
                    // conditional rendering
                    button === "Update" && <button className="btn btn-secondary" onClick={resetForm}>
                    Cancel Update
                </button>
                }
            </div>
            <div className='col-3 bg-light border border-warning border-5 rounded mt-5 mb-5 me-2 shadow'>
                <div className='ms-5'>
                    <p className='mt-5'>Status Outsider :
                    <br />
                    <input
                    className='ms-3' 
                    type='radio'
                    name='statusTinggal'
                    value='Dekat'
                    onChange={(e) => setStatusTinggal(e.target.value)}
                    /> Dekat
                    <br />
                    <input 
                    className='ms-3'
                    type='radio'
                    name='statusTinggal'
                    value='Jauh'
                    onChange={(e) => setStatusTinggal(e.target.value)}
                    /> Jauh
                    <br />
                    <input
                    className='ms-3'
                    type='radio'
                    name='statusTinggal'
                    value='Stados'
                    onChange={(e) => setStatusTinggal(e.target.value)} /> Stados
                    </p>
                    <br />
                    
                    <p className='mt-5 '>Tipe Tempat Tinggal 
                    <br />
                    <input
                    className='ms-3'
                    type='radio'
                    name='tipeTinggal'
                    value='Orang Tua / Wali'
                    onChange={(e) => setTipeTinggal(e.target.value)} /> Orang Tua / Wali
                    <br />
                    <input
                    className='ms-3'
                    type='radio'
                    name='tipeTinggal'
                    value='Tempat Kos'
                    onChange={(e) => setTipeTinggal(e.target.value)} /> Tempat Kos
                    <br />
                    
                    </p>
                    
                    <br></br>
                </div>
            </div>
         </div>
        </div>
        </div>
	    </div>
    )
}

export default Input;
