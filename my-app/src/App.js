import './App.css';
import React, {useState} from "react";
import Home from "./Home"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";//轉跳頁面

import Modify_Data from "./Modify_Data/Modify_Data";
import History_Order from "./History_Order/History_Order";
import Top_Bar from "./Top_Bar";
import Shopping_Cart from "./Shopping_Cart/Shopping_Cart";
import Payment_Method from "./Shopping_Cart/Payment_Method";



function App() {

    const [user, setUser] = useState({
        user_id: '',
        user_name: '',
        mail:'',
        phone_number:'',
        password:'',
        address:''
    })

  return (
      <Router>
        <div className="background">
            <Top_Bar set_User={setUser}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/modify-data" element={<Modify_Data User={user}/>}/>
                <Route path="/history-order" element={<History_Order/>}/>
                <Route path="/shopping-cart" element={<Shopping_Cart/>}/>
                <Route path="/payment-method" element={<Payment_Method/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
