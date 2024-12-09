import React, {useEffect, useState} from "react";
import '../App.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import MapboxClient from '@mapbox/mapbox-sdk/services/geocoding';
import axios from "axios";
import {useNavigate } from "react-router-dom";//轉跳頁面

const mapboxToken = 'pk.eyJ1Ijoibmljb2xlbGVpYW4iLCJhIjoiY20yMzZ0dHRxMDJtNTJwcHVhcXBvdnprNSJ9.RbW_OCCI94Cg9M8wOifaOQ';
const geocodingClient = new MapboxClient({accessToken:mapboxToken});

function SearchAddress({getLngLat, getAddress, User}) {
    const [address, setAddress] = useState("");  // 儲存地址
    const [lng, setLng] = useState(null); //經緯度
    const [lat, setLat] = useState(null); //經緯度
    const [isFetching, setIsFetching] = useState(false); //開始抓了沒
    const [error, setError] = useState("");

    const fetchAddress = () => {
        setIsFetching(true); //開始抓取
        if(navigator.geolocation) {
            //瀏覽器是否支持定位功能
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLng = position.coords.longitude;
                    const userLat = position.coords.latitude;

                    setLng(userLng);
                    setLat(userLat);
                    getLngLat(userLng, userLat);

                    geocodingClient.reverseGeocode({
                        //根據經緯度反向編碼成地址
                        query:[userLng, userLat],//用經緯度尋找
                        limit:1, //返回最相關結果
                        types:["address"]
                    })
                        .send()//發送請求
                        .then((response) => {
                            const match = response.body;
                            if(match.features.length>0){
                                //console.log(match.features[0]);
                                setAddress(match.features[0].place_name);
                            }else{
                                setAddress("未找到地址");
                            }
                            setIsFetching(false); //結束加載
                        })
                        .catch((error) => {
                            console.error("error fetching:", error);
                            setError("無法獲取地址");
                            setIsFetching(false);//加載完成
                        });
                },
                (error) => {
                    console.error("error fetching", error);
                    setError("無法獲取地址, 請確保以授權定位");
                    setIsFetching(false);
                },
                {enableHighAccuracy: true} //高精度定位
            );
        } else{
            setError("瀏覽器不支援定位");
            setIsFetching(false);
        }
        //console.log(address);

    };



    const fieldNames = ["路", "郵遞區號", "區", "城市", "國家"];

    const get_address = address
        .split(",")
        .map((item) => item.trim())
        .reduce((acc, cur, index) => {
            acc[fieldNames[index]] = cur;
            if (fieldNames[index] === "國家" && cur === "Taiwan") {
                acc[fieldNames[index]] = "台灣";
            }
            if (fieldNames[index] === "城市" && cur === "Taoyuan") {
                acc[fieldNames[index]] = "桃園市";
            }
            if (fieldNames[index] === "城市" && cur === "New Taipei City") {
                acc[fieldNames[index]] = "新北市";
            }
            if (fieldNames[index] === "城市" && cur === "Taipei") {
                acc[fieldNames[index]] = "台北市";
            }
            if (fieldNames[index] === "城市" && cur === "臺北市") {
                acc[fieldNames[index]] = "台北市";
            }
            return acc;
        }, {});

    useEffect(() => {
        getAddress(address);
    }, [address])

    const full_address= `${get_address.城市}${get_address.區}${get_address.路}`
    console.log(full_address);
    console.log(get_address);


    const handleSubmit = async () =>{
        try {
            const response = await axios.put(`http://localhost:8080/user/${User.user_id}`,{
                user_name: User.user_name,
                user_id:User.user_id,
                phone_number:User.phone_number,
                mail:User.mail,
                password:User.password,
                address:full_address
            });
        } catch (error){
            console.error("更新失敗：", error);
        }

    }

    useEffect(() => {
        if (full_address) {
            handleSubmit(); // 當 full_address 改變時，執行提交
        }
    }, [full_address]);

    const navigate = useNavigate();
    const jump_to_store= ()=>{
        navigate("/city-site-store")
    }


    return (
        <div className="search_address">
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search" shrink>
                    輸入你欲送達的地址
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-search"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // 更新 address 狀態
                    endAdornment={
                        <InputAdornment position="end">
                            <Button
                                aria-label="search"
                                onClick={fetchAddress}
                                edge="end"
                                sx={{
                                    color: "#e04c7f",
                                    '&:hover': {
                                        backgroundColor: "white",
                                    }
                                }}
                                disabled={isFetching} // 加載中禁用按鈕
                            >
                                <MyLocationTwoToneIcon />
                                尋找我的位置
                            </Button>
                        </InputAdornment>
                    }
                    label="輸入你欲送達的地址"
                    placeholder="Street, Postal Code"
                    color="black"
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>
            <div>
                <Button
                    aria-label="search"
                    onClick={jump_to_store}
                    variant="contained"

                    sx={{
                        backgroundColor: "#e04c7f",
                        '&:hover': {

                        }
                    }}
                >
                    尋找店家
                </Button>
            </div>


        </div>
    );
}

export default SearchAddress;
