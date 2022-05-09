import React, { useState, useEffect } from 'react';
import firebase from '../../../Config/Firebase';
// import Header from '../../molecules/Header';
import NavBarZ from '../../../Molecules/NavBarZ';

const Approving = () => {

        const [nama, setNama] = useState("")
        const [nim, setNim] = useState("")
        const [gambar, setGambar] = useState("")
        const [product, setProduct] = useState ([])
        const [button, setButton] = useState("Hello");
        const [selectedProduct, setSelectedProduct] = useState({});
        const [alamat, setAlamat] = useState("")
        const [visibility, setVisibility] = useState("invisible")
        const [listVisibility, setListVisibility] = useState("visible")
        const [keterangan, setKeterangan] = useState("");
        const [statusTinggal, setStatusTinggal] = useState("");
        const [tipeTinggal, setTipeTinggal] = useState("");
        const [addText, setAddText] = useState("");
        const [status, setStatus] = useState("");


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
                console.log("test12")
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
            setButton("Hello")
            setSelectedProduct("")
            setVisibility("invisible");
            setKeterangan("");
            setStatusTinggal("");
            setTipeTinggal("");
            setAddText("");
            setListVisibility("visible")
            
        }

        const onUpdateData = (item) => {
            setNama(`Nama : `+item[Object.keys(item)[1]].nama);
            setNim(`NIM : `+item[Object.keys(item)[1]].nim);
            setGambar(item[Object.keys(item)[1]].gambar);
            setAlamat(`Alamat : `+item[Object.keys(item)[1]].alamat);
            setButton('Tutup');
            setSelectedProduct(item);
            setVisibility("visible");
            setKeterangan(`Keterangan : `+item[Object.keys(item)[1]].keterangan);
            setStatusTinggal(`Status Tempat Tinggal : `+item[Object.keys(item)[1]].statusTinggal);
            setTipeTinggal(`Tipe Tempat Tinggal : `+item[Object.keys(item)[1]].tipeTinggal);
            setAddText("Foto Berkas : ")
            setListVisibility("invisible")
        }

        const onDeleteData = (item) => {
            // delete
            firebase.database().ref(`dataReq/${item.id}`).remove();
        }

        const onApproveData = (item) => {
            const userzData = {
                email: item[Object.keys(item)[1]].email,
                fullName: item[Object.keys(item)[1]].nama,
                status: "Approved",
            };
            setNama(item.nama);
            setNim(item.nim);
            // setGambar(item.gambar);
            setAlamat(item.alamat);
            setSelectedProduct(item);
            setKeterangan(item.keterangan);
            setStatusTinggal(item.statusTinggal);
            setTipeTinggal(item.tipeTinggal);
            setStatus("Approved");
            //Send to another ref
            firebase.database().ref('ApprovedData').push(item[Object.keys(item)[1]]);
            firebase.database().ref(`studentAcc/${item.id}`).set(userzData);
            console.log(item.id," ini item id")

            //delete data di ref sebelumnya
            firebase.database().ref(`dataReq/${item.id}`).remove();

            //reset form
            resetForm();
            console.log(item);
        }

    return (
		<div style={{backgroundSize:'cover', 
            backgroundImage: `url("https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")`}}>
			{/* <Header /> */}
			<NavBarZ />
		
            <div>
        
            <div style={{backgroundSize:'cover',minHeight:'100vh',
         backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}}className="container mt-5">
            <div className={`${visibility}`}>
            <h2>Student Details</h2>
            <div className="col-6" id="qwe">
                <h6 className="mt-3">{nama}</h6>
                <h6 className='mt-3'>{nim}</h6>
                <h6 className='mt-3'>{alamat}</h6>
                <h6 className='mt-3'>{keterangan}</h6>
                <h6 className='mt-3'>{statusTinggal}</h6>
                <h6 className='mt-3'>{tipeTinggal}</h6>
                <br />
                <h6 className='mt-3'>{addText}</h6>
                <img src={gambar} className="card-img-top"style={{height:600, width:'200%'}} alt="..." />
                <button className='btn btn-secondary mt-3' onClick={resetForm}>{button}</button>
            </div>
            </div>
            <div className={`${listVisibility}`}>
            <h2 >Student List</h2>
            <hr />
                <table className="table table-striped table-hover table-success border border-5 border-primary">
                <thead>
                    <tr className='text-center'>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(item => (
                            <tr key={item.id}className='text-center'>
                                <td>{item[Object.keys(item)[1]].nama}</td>
                                <td>{item[Object.keys(item)[1]].nim}</td>
                                <td>
                                    <button className="btn btn-info" onClick={()=>onUpdateData(item)}>View</button>
                                    <button className="btn btn-danger" onClick={()=>onDeleteData(item)}>Reject</button>
                                    <button className="btn btn-success" onClick={()=>onApproveData(item)}>Approve</button>
                                    {console.log(item[Object.keys(item)[1]].email," ini test email")}
                                    {/* {console.log(item," ini console item")} */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
            </div>
            </div>
		</div>
    )
}

export default Approving;
