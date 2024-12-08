import React, { useEffect, useState } from "react";
import "../App.css";
const Follow_Order = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState(null);
    const [orderPreparing, setOrderPreparing] = useState(null);
    const [findingDealer, setFindingDealer] = useState(null);
    const [takeMeal, setTakeMeal] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [print, setPrint] = useState("訂單準備中...");

    const prepare = "訂單準備中...";
    const find = "尋找外送員中...";
    const goToTake = "外送員kyle正準備前往取餐";
    const comeHome = "外送員kyle正在前往你家的路上...";
    const delivered = "訂單已送達";

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

        const preparing = new Date(currentDate.getTime() + 0.5 * 60000);
        const finding = new Date(currentDate.getTime() + 1 * 60000);
        const taking = new Date(currentDate.getTime() + 1.5 * 60000);
        const arriving = new Date(currentDate.getTime() + 30 * 60000);

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
            if (currentTime >= orderPreparing.getTime() && currentTime < findingDealer.getTime()) {
                setPrint(find);
                if (Notification.permission === "granted") {
                    new Notification("訂單狀態更新", { body: find });
                }
            } else if (currentTime >= findingDealer.getTime() && currentTime < takeMeal.getTime()) {
                setPrint(goToTake);
                if (Notification.permission === "granted") {
                    new Notification("訂單狀態更新", { body: goToTake });
                }
            } else if (currentTime >= takeMeal.getTime() && currentTime < arrivalTime.getTime()) {
                setPrint(comeHome);
                if (Notification.permission === "granted") {
                    new Notification("訂單狀態更新", { body: comeHome });
                }
            } else if (currentTime >= arrivalTime.getTime()) {
                setPrint(delivered);
                if (Notification.permission === "granted") {
                    new Notification("訂單狀態更新", { body: delivered });
                }
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
                    <div className="take_id"
                         style={{fontSize: "12px", fontWeight: "500", marginLeft: "20px", marginTop: "10px"}}>
                        外帶自取號碼:
                    </div>
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
                        訂單詳情
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
