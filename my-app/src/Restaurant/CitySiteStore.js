import React, {useState,useEffect} from "react";
import "../App.css"
import axios from "axios";
import Button from "@mui/material/Button";
import Components from "./Components";
import {useNavigate } from "react-router-dom";//轉跳頁面

function History_Order ({getAddress})  {
    //console.log(getAddress);
    const fieldNames = ["路", "郵遞區號", "區", "城市", "國家"];

    const get_address = getAddress
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

    const[city, setCity] = useState(get_address.城市);
    //console.log(city);
    const [site, setSite] = useState(get_address.區);

    console.log(get_address);
    return (
        <div className="background">
            <div className="move_text">
                <h1>過往訂單</h1>
                <p>這是歷史紀錄頁面。</p>
            </div>
        </div>
    );
};

export default History_Order;
