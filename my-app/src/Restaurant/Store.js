import React, {useState,useEffect} from "react";
import "../App.css"
import axios from "axios";
import Button from "@mui/material/Button";


function Store  (city)  {
    //console.log(city)
    const catchCity = city.city;
    const [user, setUser] = useState({
        Keelung:["基隆市", "01"],
        Taipei:["臺北市","02"],
        New_Taipei_City:["新北市", "03"],
        Taoyuan:["桃園市", "04"],
        Hsinchu:["新竹市", "05"],
        Miaoli:["苗栗市", "07"],
        Taichung:["台中市","08"],
        Changhua:["彰化市","09"],
        Nantou:["南投市","10"],
        Yunlin:["雲林縣","11"],
        Chiayi:["嘉義市","12"],
        Tainan:["台南市","14"],
        Kaohsiung:["高雄市","15"],
        Pingtung:["屏東縣","16"],
        Yilan:["宜蘭縣","19"],
        Hualien:["花蓮市","18"],
        Taitung:["台東市","17"],
        Penghu:["澎湖縣","20"],
        Kinmen:["金門縣","21"],

    });

    const matchedCity = Object.entries(user).find(([key, value]) => value[0] === catchCity);
    const [label, setLabel] = useState("");
    useEffect(() => {
        if (matchedCity) {
            setLabel(matchedCity[1][1]);
        } else {
            console.log("沒有找到匹配的縣市");
        }
    }, [matchedCity,user]);
    console.log(label);

    const [cityStore, setCityStore] = useState([]);

    const catchAllStore = async () => {
        if (!label) {
            console.log("Label 為空，無法查詢店家");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/store/byCity`, {
                city_id: label, // 發送的 JSON 請求體
            });
            console.log("店家列表:",response.data);
        } catch (error) {
            console.error("查詢失敗:", error);
        }
    };

    return (
        <>
        <div className="background">
            <div className="move_text">
                餐廳 &gt; {catchCity}
            </div>
            <div className="move_store_text">
                所有餐廳
            </div>
        </div>
        {/*<Button onClick={handleRegisterSubmit}/>*/}
        </>
    );
};

export default Store;
