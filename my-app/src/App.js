import './App.css';
import React, {useState} from "react";
import Home from "./Home"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";//轉跳頁面

import Modify_Data from "./Modify_Data/Modify_Data";
import History_Order from "./History_Order/History_Order";
import Top_Bar from "./Top_Bar";
import Shopping_Cart from "./Shopping_Cart/Shopping_Cart";
import Payment_Method from "./Shopping_Cart/Payment_Method";
import Follow_order from "./Follow_Order/Follow_order";



function App() {

    const [user, setUser] = useState({
        user_id: '',
        user_name: '',
        mail:'',
        phone_number:'',
        password:'',
        address:''
    })

    const [recordOrder, setRecordOrder] = useState({
        order_id:'',//不知道是什麼
        user_id:'',
        store_id:'',//不知道是什麼
        delivery_id:'',//不知道是什麼
        state:'',//不知道是什麼
        time:'',//不知道是什麼
        payment_id:'',//不知道是什麼
        name: '',
        phone: '',
        address:'',
        payment_method:'',
        how_to_take:'',//外帶是false 自取是true
        tips:''
    })
    console.log(recordOrder);

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
                <Route path="/payment-method" element={<Payment_Method getAddress={getAddress} User={user} takeMethod={takeMethod} porpRecordOrder={setRecordOrder}/>}/>
                <Route path="/follow-order" element={<Follow_order/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
