import Header from "./component/layout/Header.js"
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import {ReactNavbar} from 'overlay-navbar'

function App() {
  return (
    <BrowserRouter>
      <ReactNavbar/>

    </BrowserRouter>
  );
}

export default App;
