import Header from "./component/layout/Header.js"
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from "react";
import WebFont from "webfontloader";

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
    </BrowserRouter>
  );
}

export default App;
