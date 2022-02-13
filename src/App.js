import { Component } from 'react';
import './App.css';
import Mahasiswa from "./Components/Mahasiswa/Mahasiswa";
import Operator from './Components/Operator/Operator';

class Welcome extends Component {
  render () {
    return (
      <div>
        <h1>FullStack DevOps Project</h1>
        <h2>Sistem Pengurusan Status Village Dean</h2>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <>
      <Welcome />
      <Mahasiswa />
      <Operator />
      </>
    )
  }
}

export default App;
