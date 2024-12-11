import React, {useEffect, useState} from "react";
import "../App.css"
import axios from "axios";

function History_Order ({User})  {
    const[getUser, setGetUser] = useState(User)
    console.log(getUser);
    const [historyInfo, setHistoryInfo] = useState({});

    useEffect(() => {
        getHistoryOrder()
    }, []);

    const getHistoryOrder=  async()=>{
        try {
            // 發送 POST 請求
            const response = await axios.post("http://localhost:8080/orders/getbyuser", {
                userId:getUser.user_id
            });
            // 如果成功，輸出結果
            setHistoryInfo(response.data);
            console.log("Order Detail Created:", response.data);
        } catch (error) {
            // 如果出現錯誤，顯示錯誤訊息
            console.error("Error creating order detail:", error);
        }

    };

    // useEffect(() => {
    //
    // }, [historyInfo]);

    const parseMealContent = (mealContent) => {
        // 初始化結果陣列
        const result = [];
        // 分割每份餐點（以逗號為界）
        const meals = mealContent.split('，');
        meals.forEach((meal) => {
            const match = meal.match(/^(\d+)份\s(.+)\s(\d+)元$/);
            if (match) {
                const [, number, mealName, price] = match;
                result.push({
                    number: parseInt(number, 10),
                    mealName,
                    price: parseInt(price, 10),
                });
            }
        });
        return result;
    };

// 遍歷 historyInfo
    const historyInfoArray = Object.values(historyInfo); // 假設 historyInfo 是物件，轉成陣列
    historyInfoArray.forEach((order) => {
        if (order.meal_content) {
            const parsedMeals = parseMealContent(order.meal_content);
            console.log(`訂單 ${order.order_id} 的餐點明細：`, parsedMeals);
        }
    });

    return (
        <div className="background">
            <div className="move_text_info">
                <h1>過往訂單</h1>
                <h1>歷史訂單</h1>
                {Object.values(historyInfo).map((order, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h2>訂單編號: {order.order_id}</h2>
                        <p>姓名: {order.name}</p>
                        <p>電話: {order.phone}</p>
                        <p>地址: {order.address}</p>
                        <p>取餐方式: {order.how_to_take}</p>
                        <p>支付方式: {order.payment_method}</p>
                        <p>小費: {order.tips}</p>
                        <p>時間: {order.time}</p>
                        <h3>餐點內容:</h3>
                        <ul>
                            {parseMealContent(order.meal_content).map((meal, mealIndex) => (
                                <li key={mealIndex}>
                                    {meal.number} 份 {meal.mealName} - {meal.price} 元
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History_Order;
