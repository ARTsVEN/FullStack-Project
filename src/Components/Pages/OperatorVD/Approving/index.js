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
            setNama(`Nama : `+item.nama);
            setNim(`NIM : `+item.nim);
            setGambar(item.gambar);
            setAlamat(`Alamat : `+item.alamat);
            setButton('Tutup');
            setSelectedProduct(item);
            setVisibility("visible");
            setKeterangan(`Keterangan : `+item.keterangan);
            setStatusTinggal(`Status Tempat Tinggal : `+item.statusTinggal);
            setTipeTinggal(`Tipe Tempat Tinggal : `+item.tipeTinggal);
            setAddText("Foto Berkas : ")
            setListVisibility("invisible")
        }

        const onDeleteData = (item) => {
            // delete
            firebase.database().ref(`dataReq/${item.id}`).remove();
        }

        const onApproveData = (item) => {
            setNama(item.nama);
            setNim(item.nim);
            setGambar(item.gambar);
            setAlamat(item.alamat);
            setSelectedProduct(item);
            setKeterangan(item.keterangan);
            setStatusTinggal(item.statusTinggal);
            setTipeTinggal(item.tipeTinggal);
            //Send to another ref
            firebase.database().ref('ApprovedData').push(item);

            //delete data di ref sebelumnya
            firebase.database().ref(`dataReq/${item.id}`).remove();

            //reset form
            resetForm();
        }

    return (
		<div style={{ 
            backgroundImage: `url("https://i2.wp.com/semetonhondabalicard.com/wp-content/uploads/2014/09/Vintage-Grunge-Wood-Background-Website.jpg?ssl=1")`}}>
			{/* <Header /> */}
			<NavBarZ />
		
            <div>
        
            <div style={{minHeight:'100vh',
         backgroundImage: `url("https://coolbackgrounds.io/images/backgrounds/white/white-contour-c990a61f.svg")`}}className="container mt-5">
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
                                <td>{item.nama}</td>
                                <td>{item.nim}</td>
                                <td>
                                    <button className="btn btn-info" onClick={()=>onUpdateData(item)}>View</button>
                                    <button className="btn btn-danger" onClick={()=>onDeleteData(item)}>Reject</button>
                                    <button className="btn btn-success" onClick={()=>onApproveData(item)}>Approve</button>
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
