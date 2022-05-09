import React, { useState, useEffect } from 'react';
import firebase from '../../../Config/Firebase';
// import Header from '../../molecules/Header';
import NavBarZ from '../../../Molecules/NavBarZ';

const Approved = () => {

        const [nama, setNama] = useState("")
        const [nim, setNim] = useState("")
        const [gambar, setGambar] = useState("")
        const [product, setProduct] = useState ([])
        const [button, setButton] = useState("Save");
        const [selectedProduct, setSelectedProduct] = useState({});
        const [alamat, setAlamat] = useState("")
        const [keterangan, setKeterangan] = useState("");
        const [statusTinggal, setStatusTinggal] = useState("");
        const [tipeTinggal, setTipeTinggal] = useState("");
        
        

        useEffect(()=>{
            firebase
            .database()
            .ref('ApprovedData')
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
       

    return (
		<div style={{backgroundSize:'cover', 
        backgroundImage: `url("https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")`}}>
			{/* <Header /> */}
			<NavBarZ />
		
        <div>
        
        <div style={{backgroundSize:'cover',minHeight:'100vh',
         backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}}className="container mt-5">
            <h2>Approved</h2>
            <div className="col-6">
               
            </div>
            <hr />
            <table className="table table-striped table-hover table-success border border-5 border-primary">
                <thead>
                    <tr className='text-center'>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Alamat</th>
                        <th>Status Tempat Tinggal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(item => (
                            <tr key={item.id}className='text-center'>
                                <td>{item.nama}</td>
                                <td>{item.nim}</td>
                                <td>{item.alamat}</td>
                                <td>{item.statusTinggal}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
		</div>
    )
}

export default Approved;
