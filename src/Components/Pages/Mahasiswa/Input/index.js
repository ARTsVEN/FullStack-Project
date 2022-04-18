import React, { useState, useEffect } from 'react';
import firebase from '../../../Config/Firebase';
// import Header from '../../molecules/Header';
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

        let history = useHistory();
        

        useEffect(()=>{
            firebase
            .database()
            .ref('dataReq')
            .on('value', (res) => {
                if (res.val()){
                    //ubah menjadi array object
                    const rawData = res.val()
                    const productArr = [];
                    // console.log(Object.keys(rawData));
                    Object.keys(rawData).map((item) => {
                        productArr.push({
                            id: item,
                            ...rawData[item],
                        })
                    });
                    setProduct(productArr);
                }
            })
            
        },[]);
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
            };
            console.log(data)
            if(button === 'Submit'){
                // insert
                firebase.database().ref('dataReq').push(data);
            }else{
                // update
                firebase.database().ref(`dataReq/${selectedProduct.id}`).set(data);
            }
            //bersihkan data di form
            resetForm();
            
            
        }

        const onUpdateData = (item) => {
            setNama(item.nama);
            setNim(item.nim);
            setGambar(item.gambar);
            setAlamat(item.alamat);
            setButton('Update');
            setSelectedProduct(item);
        }

        const onDeleteData = (item) => {
            // delete
            firebase.database().ref(`dataReq/${item.id}`).remove();
        }


        const onLogout = () => {
            firebase.auth().signOut()
            .then(res => history.push("/login"))
            .catch((error) => {
                // An error happened.
              });
        }


    return (
		<div style={{ 
            backgroundImage: `url("https://i2.wp.com/semetonhondabalicard.com/wp-content/uploads/2014/09/Vintage-Grunge-Wood-Background-Website.jpg?ssl=1")`}}>
			{/* <Header /> */}
			<NavBar />
		
        <div>
        
        <div style={{minHeight:'100vh',
      backgroundImage: `url("https://coolbackgrounds.io/images/backgrounds/white/white-contour-c990a61f.svg")`}}className="container mt-5">
            <h2 className='mt-3'>Input Data</h2>
            {/* <button className="btn btn-primary" onClick={onLogout}>Logout</button> */}
            <div className='row justify-content-evenly'>
            <div className="col-8 mt-5">
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
            
            
            
             {/* <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>NIM</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(item => (
                            <tr key={item.id}>
                                <td>{item.nama}</td>
                                <td>{item.nim}</td>
                                <td>
                                    <button className="btn btn-success" onClick={()=>onUpdateData(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={()=>onDeleteData(item)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
        </div>
        </div>
        </div>
	    </div>
    )
}

export default Input;
