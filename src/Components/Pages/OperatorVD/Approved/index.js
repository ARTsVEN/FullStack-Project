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
		<div style={{ 
            backgroundImage: `url("https://i2.wp.com/semetonhondabalicard.com/wp-content/uploads/2014/09/Vintage-Grunge-Wood-Background-Website.jpg?ssl=1")`}}>
			{/* <Header /> */}
			<NavBarZ />
		
        <div>
        
        <div style={{minHeight:'100vh',
      backgroundImage: `url("https://coolbackgrounds.io/images/backgrounds/white/white-contour-c990a61f.svg")`}}className="container mt-5">
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
