import Header from "./component/layout/Header/Header.js"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from './component/layout/Home/Home.js'


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
  }, [])


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
