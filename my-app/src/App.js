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

    const [recordOrder, setRecordOrder] = useState({})
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

    useEffect(() => {
        console.log(getStoreName)
    }, [getStoreName]);

    const [getTotalMeal, setGetTotalMeal] = useState([]);

    // useEffect(() => {
    //     console.log(getTotalMeal);
    // }, [getTotalMeal]);

    const[shoppingCartInfo, setShoppingCartInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        console.log(totalPrice);
    }, [totalPrice]);


  return (
      <Router>
        <div className="background">
            <Top_Bar set_User={setUser}/>
            <Routes>
                <Route path="/" element={<Home setGetAddress={setGetAddress} User={user} setCity={setCity} setGetCitySite={setGetCitySite}/>}/>
                <Route path="/modify-data" element={<Modify_Data User={user}/>}/>
                <Route path="/history-order" element={<History_Order User={user}/>}/>
                <Route path="/shopping-cart"
                       element={<Shopping_Cart
                           setTakeMethod={setTakeMethod}
                           getTotalMeal={getTotalMeal}
                           setShoppingCartInfo={setShoppingCartInfo}
                           setTotal_Price={setTotalPrice}
                       />}/>
                <Route path="/payment-method"
                       element={<Payment_Method
                           getAddress={getAddress}
                           User={user}
                           takeMethod={takeMethod}
                           porpRecordOrder={setRecordOrder}
                           shoppingCartInfo={shoppingCartInfo}
                           getStoreName={getStoreName}
                           totalPrice={totalPrice}
                           storeId={storeId}
                       />}/>
                <Route path="/follow-order" element={<Follow_order shoppingCartInfo={shoppingCartInfo}
                                                                   getStoreName={getStoreName}
                                                                   totalPrice={totalPrice}/>}/>
                <Route path="/store" element={<Store city={city} setGetId={setGetStoreId} setGetStoreName={setGetStoreName}/>}/>
                <Route path="/store-info" element={<Store_Info storeId={storeId} getStoreName={getStoreName} setGetTotalMeal={setGetTotalMeal}/>}/>
                <Route path="/city-site-store" element={<CitySiteStore getAddress={getAddress} setGetId={setGetStoreId} setGetStoreName={setGetStoreName}/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;
