// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

import Enter_Address from "./search_address/Enter_Address";


function Home({setGetAddress, User}) {

    //user假設
    const [fake_user, setFakeUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user/1")
            .then(response => {
                console.log("fetch data:", response.data);
                setFakeUsers(response.data);
            })
            .catch(error => {
                console.error("error fetching")
            });
    }, []);
    //const navigate = useNavigate(); //轉跳頁便用

    const [lng, setLng] = useState(null); //經度
    const [lat, setLat] = useState(null); //緯度

    const [address, setAddress] = useState("");
    setGetAddress(address);

    const handleLngLat = (data1, data2) => {
        setLng(data1);
        setLat(data2);
    }

    useEffect(() => {
        if (lng !== null && lat !== null) {
            //console.log(`經度: ${lng}, 緯度: ${lat}`);
        }
    }, [lng, lat]);



    return (
        <div className="background">
            <div className="move_text">
                <div>從美食到生鮮雜貨 上千萬種商品</div>
                <div>馬上點馬上到</div>
            </div>
            {/*未登入*/}
            <Enter_Address  getLngLat = {handleLngLat} getAddress={setAddress} User={User}/>
            {/*{console.log(lng)}*/}
            {/*{console.log(address)}*/}

        </div>

    );
}

export default Home;
