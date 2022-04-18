import React from 'react';
import NavBar from '../../../Molecules/NavBar';
import { useHistory } from 'react-router-dom';


const Dashboard = () => {

  let history = useHistory ();

  const updateProfile = () => {
    history.push('/updateprofile');
  }

  return (
    <div>
      <NavBar />
      <h3>Profile</h3>
      <p>Menampilkan Data Pribadi / Profile Pengguna Mahasiswa</p>
      <button type="button" onClick={updateProfile} class="btn btn-warning">
       Update Profile
      </button>
    </div>
  )
}

export default Dashboard;