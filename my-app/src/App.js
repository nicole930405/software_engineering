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
    // const fieldNames = ["路", "郵遞區號", "區", "城市", "國家"];
    // const address = getAddress
    //     .split(",")
    //     .map((item) => item.trim())
    //     .reduce((acc, cur, index) => {
    //         acc[fieldNames[index]] = cur;
    //         if (fieldNames[index] === "國家" && cur === "Taiwan") {
    //             acc[fieldNames[index]] = "台灣";
    //         }
    //         if (fieldNames[index] === "城市" && cur === "Taoyuan") {
    //             acc[fieldNames[index]] = "桃園";
    //         }
    //         return acc;
    //     }, {});
    // //console.log(address);
    // const fullAddress = `${address.城市}${address.區}${address.路}`;

    const [getAddress, setGetAddress] = useState("")
    //console.log((getAddress))

    const [takeMethod, setTakeMethod] = useState({})

  return (
      <Router>
        <div className="background">
            <Top_Bar set_User={setUser}/>
            <Routes>
                <Route path="/" element={<Home setGetAddress={setGetAddress} User={user}/>}/>
                <Route path="/modify-data" element={<Modify_Data User={user}/>}/>
                <Route path="/history-order" element={<History_Order/>}/>
                <Route path="/shopping-cart" element={<Shopping_Cart setTakeMethod={setTakeMethod}/>}/>
                <Route path="/payment-method" element={<Payment_Method getAddress={getAddress} User={user} takeMethod={takeMethod}/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
