// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

import Enter_Address from "./search_address/Enter_Address";


function Home() {
    //預設登入狀態(可自己調T、F)
    const [IsLogIn, setIsLogIn] = useState(false);

    const [LoginModalOpen, setLoginModalOpen] = useState(false); //登入頁面
    const [FunctionList, setFunctionList] = useState(false) //以登入的使用者功能
    const [user, setUser] = useState({
        user_id: '',
        user_name: '',
        mail:'',
        password:'',
        address:''
    }); //user資料

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

    const handleIconClick_person = () => {
        if (!IsLogIn) {
            //未登入
            setLoginModalOpen(true);
            //console.log(LoginModalOpen);
        }else{
            //登入
            setFunctionList(true);
        }
    }

    const handleIconClick_shopping_cart = () => {
        if (!IsLogIn) {
            //未登入
            setLoginModalOpen(true);
            //console.log(LoginModalOpen);
        }else{
            //登入

        }
    }

    const closeLoginModal = () => {
        //login畫面
        setLoginModalOpen(false)
    }

    const closeFunctionList=() =>{
        setFunctionList(false)
    }

    const handle_setIsLogIn = (value) => {
        setIsLogIn(value);
    }

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
            <Enter_Address  getLngLat = {handleLngLat} getAddress={setAddress}/>
            {/*{console.log(lng)}*/}
            {/*{console.log(address)}*/}

        </div>

    );
}

export default Home;
