import "../App.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import {styled} from "@mui/material/styles";
import Rating from '@mui/material/Rating';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from "@mui/material/Button";

const Image = styled('img')({

    width: '150px', // 固定寬度
    height: '150px', // 固定高度，與寬度相等
    borderRadius: '15px', // 如果需要圓角
    objectFit: 'cover', // 確保圖片填滿正方形框架

});

const RectangleBox = styled('div')({
    width: '650px', // 固定寬度
    height: '150px', // 固定高度，長方形
    borderRadius: '10px', // 圓角
    border: '2px solid #f0f0f0', // 邊框顏色與寬度
    backgroundColor:'white',
    padding: '10px', // 內邊距
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // 平滑過渡效果
    '&:hover': {
        transform: 'scale(1.005)', // 放大圖片
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // 添加陰影
        cursor: 'pointer',
    },
});

const ModalOverlay = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
});

const ModalBox = styled("div")({
    width: "400px",
    height: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    zIndex: 1001,
});

function Store_Info ({storeId, getStoreName})  {
    console.log(storeId);
    const [getMenu, setGetMenu] = useState([]);


    useEffect(() => {
        if (!storeId) {
            console.log("storeId 未設置，暫不發送請求");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/menu/byStoreId`, {
                    storeId: storeId, // 發送的 JSON 請求體
                });
                setGetMenu(response.data);
                console.log("菜單資料:", response.data);
            } catch (error) {
                console.error("查詢失敗:", error);
            }
        };
        fetchData();
    }, [storeId]);
    //console.log(mealName);


    const [value, setValue] = React.useState(2);

    // const [get, setGet] = useState([
    //     { meal_id: 2, meal_name: '美式咖啡', meal_price: 50, meal_label: '飲品', meal_option: null },
    //     { meal_id: 3, meal_name: '拿鐵', meal_price: 60, meal_label: '飲品', meal_option: null },
    //     { meal_id: 4, meal_name: '卡布奇諾', meal_price: 70, meal_label: '飲品', meal_option: null },
    // ]);
    const [number, setNumber] = useState(0);
    const [mealName, setMealName] = useState("");
    const [mealPrice, setMealPrice] = useState(0);
    const [showMenuDetail, setShowMenuDetail] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [mealId, setMealId] = useState(0);

    const clickOrder=(meal_name, meal_price, meal_id)=>{
        setShowMenuDetail(true);
        setMealName(meal_name);
        setMealPrice(meal_price);
        setMealId(meal_id)
        setNumber(0);
        setTotalPrice(0);
    }

    const closeModal = () => {
        setShowMenuDetail(false);
    };


    const [showNumber, setShowNumber] = useState(false);


    const [totalMealInfo, setTotalMealInfo] = useState({
        meal_price:0,
        meal_name:'',
        meal_number:0,
        meal_id:0,
    })


    const addNumber=()=>{
        const nextNumber = number + 1;
        const price = totalPrice + mealPrice;
        setNumber(nextNumber);
        setTotalPrice(price);
        //setNumber(prevNumber => prevNumber + 1);
        // setTotalPrice(prevPrice => prevPrice + mealPrice);
        setTotalMealInfo((prevInfo)=>({
            ...prevInfo,
            meal_name: mealName,
            meal_price: price,
            meal_number: nextNumber,
            meal_id:mealId,
        }))
        if(number != 0){
            setShowNumber(true);
        }else{
            setShowNumber(false);
        }
    }

    const subNumber=()=>{
        if(number != 0){
            const nextNumber = number - 1;
            const price = totalPrice - mealPrice;
            setNumber(nextNumber);
            setTotalPrice(price);
            setTotalMealInfo((prevInfo)=>({
                ...prevInfo,
                meal_name: mealName,
                meal_price: price,
                meal_number: nextNumber,
            }))
            if(number == 0){
                setShowNumber(false);
            }else{
                setShowNumber(true);
            }
        }else{
            setShowNumber(false);
        }
    }

    // const addToShoppingCart =async (totalMealInfo)=>{
    //     console.log(totalMealInfo);
    //     try {
    //         // 準備 payload 資料
    //         const payload = {
    //             mealId: 7,          // 傳送 mealIds 列表
    //             mealOption: totalMealInfo.meal_name,   // 傳送 mealOption
    //             quantity: totalMealInfo.meal_number,       // 傳送 quantity
    //         };
    //
    //         // 發送 POST 請求
    //         const response = await axios.post("http://localhost:8080/orderdetail/create", payload);
    //
    //         // 如果成功，輸出結果
    //         console.log("Order Detail Created:", response.data);
    //     } catch (error) {
    //         // 如果出現錯誤，顯示錯誤訊息
    //         console.error("Error creating order detail:", error);
    //     }
    // }

    // const handleCreateOrderDetail = async () => {
    //
    // };


    return (
        <div className="background">

            <div className="move_text">
                <Image
                    src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5GQ0IpA3iord8UHJgaeYNnsSKPSROPT7YPK_SEDIf11eiY4XdinS8eOeE6giVsDSOxj4X4DAWU7B1cViZQy-f_ZKujg2AmalliU0xOQ"
                    alt=""

                />
                <div style={{
                    marginLeft:'180px',
                    marginTop:'-100px'
                }}>
                    {getStoreName || "未提供店鋪名稱"}
                </div>
                <div style={{
                    color: '#e04c7f',
                    marginLeft:'180px'
                }}>
                    免外送服務費
                </div>
                <div style={{
                    marginTop:'60px'
                }}
                >
                    <Rating name="read-only" value={5} readOnly />
                </div>

                <div>
                    <AutoAwesomeIcon sx={{
                        color:'#ffdd01',
                    }}/>
                    人氣精選
                    <WhatshotIcon sx={{
                        color:'#ffdd01',
                    }}/>

                    {getMenu.map((meal) => (
                        <RectangleBox key={meal.meal_id} onClick={()=>clickOrder(meal.meal_name, meal.meal_price, meal.meal_id)}>
                            <div>
                                {meal.meal_name}
                            </div>
                            <div>
                                ${meal.meal_price}
                            </div>
                            <IconButton sx={{
                                marginLeft:'600px',
                                marginTop:'70px'
                            }}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </RectangleBox>
                    ))}
                </div>
            </div>
            {showMenuDetail && (
                <ModalOverlay onClick={closeModal}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <IconButton sx={{
                            marginLeft: '350px'
                        }}>
                            <HighlightOffIcon onClick={closeModal}/>
                        </IconButton>
                        <div>
                            {mealName}
                        </div>
                        <div>
                            ${mealPrice}
                        </div>
                        <div style={{
                            marginTop:'180px'
                        }}>
                        <IconButton onClick={subNumber}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                            {number}
                        <IconButton onClick={addNumber}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: number > 0 ? '#e04c7f' : 'gray', // 根據 number 改變顏色
                                    '&:hover': {

                                    },
                                }}
                                disabled={number === 0} // 如果 number 等於 0 禁用按鈕
                                onClick={() =>{
                                    if (number > 0) {
                                    console.log("已放入購物車"); // 這裡放入實際的功能
                                        //console.log(totalMealInfo);
                                        //addToShoppingCart(totalMealInfo);
                                }
                                }}
                            >
                                放入購物車
                            </Button>
                        </div>
                    </ModalBox>
                </ModalOverlay>
            )}
        </div>
    );
};

export default Store_Info;
