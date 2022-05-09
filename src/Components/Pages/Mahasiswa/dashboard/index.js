import React, {useState, useEffect} from 'react';
import NavBar from '../../../Molecules/NavBar';
import firebase from '../../../../Components/Config/Firebase';

const Dashboard = () => {
  const [users, setUsers] = useState({});

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
        }
      });
      }

    };

    useEffect(() => {
      getUserProfile();
      setTimeout(()=>{
        getUserProfile();
      },1000)
      console.log("test")
    }, []);
  
  return (
    <div>
      <NavBar />
      <div style={{backgroundSize: 'cover',minHeight:'100vh',
      backgroundImage: `url("https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")`}}>
        <br />
        <br />
        <div className='container shadow' style={{backgroundSize:'cover',minHeight:'100vh',
         backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}} >
        <div className='row'>
        <div className='col-8 container mt-5 shadow card' style={{backgroundSize:'cover',minHeight:'100vh',
         backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60")`}}>
        <br />
        <br />
        <div style={{color:'#000000'}}>
        <h3>Profile</h3>
        <p>Menampilkan Data Pribadi / Profile Pengguna Mahasiswa</p>
        <hr className='mt-5'/>
          <div className='row'>
            <div className='col-2'>
            <h5>Nama</h5>
            <br />
            <h5>Email</h5>
            <br />
            <h3>Status</h3>
            </div>

            <div className='col-1'> 
            <h5>:</h5>
            <br />
            <h5>:</h5>
            <br />
            <h5>:</h5>
            </div>

            <div className='col-5'> 
            <h5>{users.fullName}</h5>
            <br />
            <h5>{users.email} </h5>
            <br />
            <h3 className='text-success'>{users.status}</h3>
            {console.log(users)}
            
            </div>
          
          </div>
          <hr />
          </div>
          </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard;