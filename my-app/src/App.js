import './App.css';
import React, {useEffect, useState} from "react";
import Home from "./Home"

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";//轉跳頁面

import Modify_Data from "./Modify_Data/Modify_Data";
import History_Order from "./History_Order/History_Order";
import Top_Bar from "./Top_Bar";
import Shopping_Cart from "./Shopping_Cart/Shopping_Cart";
import Payment_Method from "./Shopping_Cart/Payment_Method";
import Follow_order from "./Follow_Order/Follow_order";
import Store from "./Restaurant/Store";
import Store_Info from "./Restaurant/Store_Info";
import CitySiteStore from "./Restaurant/CitySiteStore";


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
        state:'',//以下單 等待接單
        time:'',//2024-11-28
        payment_method:'',
        name: '',
        phone: '',
        address:'',
        how_to_take:'',
        tips:'',
        user_id:'',
        store_id:'',//不知道是什麼
    })
    //console.log(user);ok

    const [getAddress, setGetAddress] = useState("");
    //console.log(getAddress)
    //const full_address= `${getAddress.城市}${getAddress.區}${getAddress.路}`

    const [takeMethod, setTakeMethod] = useState({});

    const [city, setCity] = useState("");
    const [storeId, setGetStoreId] = useState(0);
    //console.log(storeId);
    const [getStoreName, setGetStoreName] = useState("");
    //console.log(getStoreName);

    const [getCitySite, setGetCitySite] = useState({
        city:'',
        site:'',
    })

    // useEffect(() => {
    //     console.log(getCitySite)
    // }, [getCitySite]);

    const [getTotalMeal, setGetTotalMeal] = useState([]);

    // useEffect(() => {
    //     console.log(getTotalMeal);
    // }, [getTotalMeal]);

    const[shoppingCartInfo, setShoppingCartInfo] = useState([]);
    useEffect(() => {
        console.log(shoppingCartInfo);
    }, [shoppingCartInfo]);


  return (
      <Router>
        <div className="background">
            <Top_Bar set_User={setUser}/>
            <Routes>
                <Route path="/" element={<Home setGetAddress={setGetAddress} User={user} setCity={setCity} setGetCitySite={setGetCitySite}/>}/>
                <Route path="/modify-data" element={<Modify_Data User={user}/>}/>
                <Route path="/history-order" element={<History_Order/>}/>
                <Route path="/shopping-cart" element={<Shopping_Cart setTakeMethod={setTakeMethod} getTotalMeal={getTotalMeal} setShoppingCartInfo={setShoppingCartInfo}/>}/>
                <Route path="/payment-method"
                       element={<Payment_Method
                           getAddress={getAddress}
                           User={user}
                           takeMethod={takeMethod}
                           porpRecordOrder={setRecordOrder}
                           shoppingCartInfo={shoppingCartInfo}/>}/>
                <Route path="/follow-order" element={<Follow_order/>}/>
                <Route path="/store" element={<Store city={city} setGetId={setGetStoreId} setGetStoreName={setGetStoreName}/>}/>
                <Route path="/store-info" element={<Store_Info storeId={storeId} getStoreName={getStoreName} setGetTotalMeal={setGetTotalMeal}/>}/>
                <Route path="/city-site-store" element={<CitySiteStore getAddress={getAddress}/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
