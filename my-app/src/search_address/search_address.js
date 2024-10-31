import React, {useEffect, useState} from "react";
import '../App.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import MapboxClient from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxToken = 'pk.eyJ1Ijoibmljb2xlbGVpYW4iLCJhIjoiY20yMzZ0dHRxMDJtNTJwcHVhcXBvdnprNSJ9.RbW_OCCI94Cg9M8wOifaOQ';
const geocodingClient = new MapboxClient({accessToken:mapboxToken});

const city_name=[
    {en: "Taipei", zh:"臺北市"},
    {en: "Keelung", zh:"基隆市"},
    {en: "New Taipei", zh:"新北市"},
    {en: "Taoyuan", zh:"桃園市"},
]

function SearchAddress({getLngLat, getAddress}) {
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

    useEffect(() => {
        getAddress(address);
    }, [address])


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


        </div>
    );
}

export default SearchAddress;
