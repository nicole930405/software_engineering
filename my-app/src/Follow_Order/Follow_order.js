import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";//轉跳頁面

import "../App.css";
const Follow_Order = ({shoppingCartInfo, getStoreName, totalPrice}) => {
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState(null);
    const [orderPreparing, setOrderPreparing] = useState(null);
    const [findingDealer, setFindingDealer] = useState(null);
    const [takeMeal, setTakeMeal] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [print, setPrint] = useState("訂單準備中...");
    const [lastNotifiedStatus, setLastNotifiedStatus] = useState("");
    const navigate = useNavigate();
    const [cartInfo, setCartInfo] = useState(shoppingCartInfo);
    const [nameInfo, setStoreName] = useState(getStoreName);
    const [totalPri, setTotalPri] = useState(totalPrice)

    const prepare = "訂單準備中...";
    const find = "尋找外送員中...";
    const goToTake = "外送員kyle正準備前往取餐";
    const comeHome = "外送員kyle正在前往你家的路上...";
    const delivered = "訂單已送達";
    const completed = "已完成";

    const formatTime = (date) => {
        return date.toLocaleString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',  // 年
            month: 'long',    // 月 (完整名稱，如 "12月")
            day: 'numeric'    // 日
        });
    };


    useEffect(() => {

        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        const currentDate = new Date();

        setCurrentDateTime(formatTime(currentDate));

        const preparing = new Date(currentDate.getTime() + 0.16 * 60000);
        const finding = new Date(currentDate.getTime() + 0.33 * 60000);
        const taking = new Date(currentDate.getTime() + 0.49 * 60000);
        const arriving = new Date(currentDate.getTime() + 1 * 60000);

        setOrderPreparing(preparing);
        setFindingDealer(finding);
        setTakeMeal(taking);
        setArrivalTime(arriving);

        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if (orderPreparing && findingDealer && takeMeal && arrivalTime) {
            let newStatus = "";

            if (currentTime >= orderPreparing.getTime() && currentTime < findingDealer.getTime()) {
                newStatus = find;
            } else if (currentTime >= findingDealer.getTime() && currentTime < takeMeal.getTime()) {
                newStatus = goToTake;
            } else if (currentTime >= takeMeal.getTime() && currentTime < arrivalTime.getTime()) {
                newStatus = comeHome;
            } else if (currentTime >= arrivalTime.getTime()) {
                newStatus = delivered;
            }

            if (newStatus !== lastNotifiedStatus) {
                setPrint(newStatus);
                if (Notification.permission === "granted") {
                    new Notification("訂單狀態更新", { body: newStatus });
                }
                setLastNotifiedStatus(newStatus);
            }
            if (newStatus === delivered) {
                setPrint(completed);
                setTimeout(() => {
                    navigate("/");
                }, 10000);
            }
        }
    }, [currentTime, orderPreparing, findingDealer, takeMeal, arrivalTime]);

    return (
        <div className="background">
            <div className="move_text">
                <div className="take_time">
                    <div style={{color: "gray", fontSize: "12px", fontWeight: "500", marginLeft: "20px"}}>
                        外帶自取時間
                    </div>
                    <div style={{marginTop: "10px", marginLeft: "20px"}}>
                        <div>{formatDate(new Date())}{currentDateTime} - {arrivalTime ? formatTime(arrivalTime) : ""}</div>
                    </div>
                    {/*<div className="take_id"*/}
                    {/*     style={{fontSize: "12px", fontWeight: "500", marginLeft: "20px", marginTop: "10px"}}>*/}
                    {/*    外帶自取號碼:*/}
                    {/*</div>*/}
                    <div style={{fontSize: "12px", fontWeight: "500", marginLeft: "20px", marginTop: "10px"}}>
                        {print}
                    </div>
                    <div style={{
                        color: "gray",
                        fontSize: "12px",
                        fontWeight: "500",
                        marginLeft: "20px",
                        marginTop: "10px"
                    }}
                    >
                        領取時請檢查餐點是否正確，此為外帶訂單，不適用於餐廳內用!
                    </div>
                </div>
                <div className="how_take">
                    <div style={{
                        marginLeft:"20px"
                    }}>
                        <div>
                            訂單詳情
                        </div>
                        <div>
                            店家:{nameInfo}
                        </div>
                        <div>
                            餐點:
                            {cartInfo.map((order, index) => (
                                <div key={index}>
                                    {order.meal_number} x {order.meal_name} ${order.meal_price}
                                </div>
                            ))}
                        </div>
                        <div>
                            總價:{totalPri}
                        </div>
                    </div>
                    <div style={{
                        marginLeft:"20px"
                    }}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Follow_Order;
