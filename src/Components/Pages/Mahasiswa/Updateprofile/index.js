import { useState } from 'react';
import React from 'react';
import NavBar from '../../../Molecules/NavBar';
// import axios from 'axios';

const UpdateProfile = () => {
  const [staOut, setStaout] = useState("");
  const [tipett, setTipett] = useState ("");
  const [alamat, setAlamat] = useState ("");
  const [alasan, setAlasan] = useState ("");
  const [upFile, setUpfile] = useState ("");


  const handleSubmit = () => {
    
    const dataProfile = {
      staOut: staOut,
      tipett: tipett,
      alamat: alamat,
      alasan: alasan,
      upFile: upFile,
    };
    //display data yang disimpan
    console.log (dataProfile);

    //simpan ke database

    //refresh data
    setStaout('');
    setAlamat('');
    setAlasan('');
    setTipett('');


  };

  return (
    <div>
      <NavBar />
      <p>Status Outsider 
        <input 
        type='radio'
        name='staOut'
        value='Dekat'
        onChange={(e) => setStaout(e.target.value)}
        /> Dekat
        <input 
        type='radio'
        name='staOut'
        value='Jauh'
        onChange={(e) => setStaout(e.target.value)}
        /> Jauh
        <input 
        type='radio'
        name='staOut'
        value='Stados'
        onChange={(e) => setStaout(e.target.value)}
        /> Stados
      </p>
      <p>Tipe Tempat Tinggal 
        <input
        type='radio'
        name='tipett'
        value='Orang Tua / Wali'
        onChange={(e) => setTipett(e.target.value)} /> Orang Tua / Wali
        <input
        type='radio'
        name='tipett'
        value='Tempat Kos'
        onChange={(e) => setTipett(e.target.value)} /> Tempat Kos
      </p>
      <div>
        <p>
        Alamat Tempat Tinggal
        <input placeholder=''
        value={alamat}
        onChange={(e) => setAlamat(e.target.value)}
         />
        </p>

        <p>
          Keterangan / Alasan
        <input placeholder=''
        value={alasan}
        onChange={(e) => setAlasan(e.target.value)} />
        </p>
        
        <div>
            <p>Upload Berkas
              <input type='file' onChange={(e) => setUpfile(e.target.files[0])} />
              
            </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
      </div>
  );
};

export default UpdateProfile;