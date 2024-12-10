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

function Store_Info ({storeId, getStoreName, setGetTotalMeal})  {
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
    // const [mealName, setMealName] = useState("");
    // const [mealPrice, setMealPrice] = useState(0);
    const [showMenuDetail, setShowMenuDetail] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [mealId, setMealId] = useState(0);



    const closeModal = () => {
        setShowMenuDetail(false);
    };


    const [showNumber, setShowNumber] = useState(false);


    const [totalMealInfo, setTotalMealInfo] = useState([]);




    const addNumber=(meal_id, meal_name, meal_Price)=>{
        console.log("meal_id:", meal_id);
        console.log("meal_name:", meal_name);
        console.log("meal_Price:", meal_Price);
        setTotalMealInfo((prevInfo) => {
            // 檢查是否已存在該 meal_id
            const existingMeal = prevInfo.find((meal) => meal.meal_id === meal_id);

            if (existingMeal) {
                // 如果存在，更新數量與價格
                return prevInfo.map((meal) =>
                    meal.meal_id === meal_id
                        ? {
                            ...meal,
                            meal_number: meal.meal_number + 1, // 增加數量
                            meal_price: meal.meal_price + meal_Price, // 更新價格
                        }
                        : meal
                );
            } else {
                // 如果不存在，新增一個新的餐點物件
                return [
                    ...prevInfo,
                    {
                        meal_id:meal_id,
                        meal_name: meal_name,
                        meal_price: meal_Price,
                        meal_number: 1, // 初始數量為 1
                    },
                ];
            }
        });
    }

    useEffect(() => {
        console.log(totalMealInfo);
    }, [totalMealInfo]);

    const subNumber=(meal_id, meal_name, meal_Price)=>{
        console.log("meal_id:", meal_id);
        console.log("meal_name:", meal_name);
        console.log("meal_Price:", meal_Price);
        setTotalMealInfo((prevInfo) => {
            // 檢查是否已存在該 meal_id
            const existingMeal = prevInfo.find((meal) => meal.meal_id === meal_id);

            if (existingMeal) {
                // 如果存在，更新數量與價格
                const updatedMeals = prevInfo.map((meal) =>
                    meal.meal_id === meal_id
                        ? {
                            ...meal,
                            meal_number: meal.meal_number > 0 ? meal.meal_number - 1 : meal.meal_number, // 如果數量大於 1，才減少
                            meal_price: meal.meal_number > 0 ? meal.meal_price - meal_Price : meal.meal_price, // 如果數量大於 1，才減少價格
                        }
                        : meal
                );

                // 移除數量為 0 的餐點
                return updatedMeals.filter((meal) => meal.meal_number > 0);
            } else {
                // 如果不存在
                return prevInfo;
            }
        });
    }

    const getMealNumber = (meal_id) => {
        const meal = totalMealInfo.find((item) => item.meal_id === meal_id);
        console.log(meal);
        return meal ? meal.meal_number : 0; // 如果找不到，返回數量 0
    };

    const [totalId, setTotalId] = useState([]);
    const [totalOption, setTotalOption] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [add, setAdd] = useState(false);

    const addToShoppingCart = () => {
        const ids = totalMealInfo.map((meal) => meal.meal_id);
        setTotalId(ids);

        const options = totalMealInfo.map((meal) => meal.meal_name).join(" ");
        setTotalOption(options);

        const totalQuantity = totalMealInfo.reduce((sum, meal) => sum + meal.meal_number, 0);
        setQuantity(totalQuantity);

        setGetTotalMeal(totalMealInfo);
        setAdd((prevAdd) => !prevAdd);
        setCountData((prev) => prev + 1);

    }

    const [countData, setCountData] = useState(0);

    // useEffect(() => {
    //     const sendOrderDetails = async () => {
    //         try {
    //             // 準備 payload 資料
    //             const payload = {
    //                 mealId: totalId, // 傳送 mealIds 列表
    //                 mealOption: totalOption, // 傳送 mealOption (名稱以空格隔開)
    //                 quantity: quantity.toString(), // 傳送總數量
    //             };
    //
    //             // 發送 POST 請求
    //             const response = await axios.post("http://localhost:8080/orderdetail/create", payload);
    //
    //             // 如果成功，輸出結果
    //             console.log("Order Detail Created:", response.data);
    //         } catch (error) {
    //             // 如果出現錯誤，顯示錯誤訊息
    //             console.error("Error creating order detail:", error);
    //         }
    //     };
    //
    //     if (totalMealInfo.length > 0) {
    //         sendOrderDetails();
    //     }
    //
    // }, [add]);

    useEffect(() => {
        console.log(countData);
    }, [countData]);






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
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: totalMealInfo.length === 0 ? "#D3D3D3" : "#e04c7f",
                            marginLeft:"50px",
                            marginTop:"-30px",
                        }}
                        disabled={totalMealInfo.length === 0}
                        onClick={addToShoppingCart}
                    >
                        新增至購物車
                    </Button>

                    {getMenu.map((meal) => (
                        <RectangleBox key={meal.mealId}>
                            <div>
                                {meal.meal_name}
                            </div>
                            <div>
                                ${meal.meal_price}

                            </div>
                            <IconButton onClick={() => subNumber(meal.mealId, meal.meal_name, meal.meal_price)}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                            {/*{number}*/}
                            <span>{getMealNumber(meal.mealId)}</span>
                            <IconButton onClick={() => addNumber(meal.mealId, meal.meal_name, meal.meal_price)}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </RectangleBox>
                    ))}
                    <div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Store_Info;
