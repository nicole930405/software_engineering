import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";//轉跳頁面
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from "axios";

const Payment_Method = ({ getAddress, User, takeMethod, porpRecordOrder, shoppingCartInfo ,getStoreName, totalPrice,storeId }) => {
    const navigate = useNavigate();
    const [getuserInfo, setGetUserInfo] = useState(User);
    const [orderInfo, setOrderInfo] = useState(shoppingCartInfo);
    const [storeName, setStoreName] = useState(getStoreName);
    const [total_price, setTotal_price] = useState(totalPrice);
    const [getStoreId, setGetStoreId] = useState(storeId);
    const [method, setMethod] = useState(takeMethod);

    const orderSummary = orderInfo
        .map(
            (order) =>
                `${order.meal_number}份 ${order.meal_name} ${order.meal_price}元`
        )
        .join("，"); // 用逗號分隔每個訂單的字串

    useEffect(() => {
        console.log(storeName);
        console.log(orderInfo);
        console.log(total_price);
    }, [storeName]);
    const fieldNames = ["路", "郵遞區號", "區", "城市", "國家"];
    const address = getAddress
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
            return acc;
        }, {});

    const [userInfo, setUserInfo] = useState({
        user_name:'',
        address:'',
        mail:'',
        phone_number:'',
        userId:''
    })
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${User.userId}`)
            .then(response => {
                //console.log("fetch data:", response.data);
                setUserInfo({
                    user_name:response.data.user_name,
                    address: response.data.address,
                    mail:response.data.mail,
                    phone_number:response.data.phone_number,
                    userId: response.data.userId
                })
            })
            .catch(error => {
                console.error("error fetching")
            });
    }, []);

    const [fullAddress, setFullAddress] = useState(`${address.城市}${address.區}${address.路}`);
    const [isClick, setIsClick] = useState(false);
    const [isModify, setIsModify] = useState(false);

    const [name, setName] = useState(User.user_name);
    const [phone, setPhone] = useState(User.phone_number);
    const [getNewAddress, setGetAddress] = useState(User.address);
    const [take, setTake] = useState(false); // 初始值為 false
    const [changeTake, setChangeTake] = useState(method.how_to_take);
    const [value, setValue] = useState("credit_card");

    // 初始化 `take` 狀態
    useEffect(() => {
        setTake(takeMethod.how_to_take === "自取");
    }, [takeMethod]);
    useEffect(() => {
        console.log(takeMethod);
    }, [changeTake]);

    const clickModifyData = () => setIsClick(true);
    const clickCancel = () => setIsClick(false);

    const clickModifyAddress = () => setIsModify(true);
    const clickCancelAddress = () => setIsModify(false);

    const newName = (event) => setName(event.target.value);
    const newPhoneNumber = (event) => setPhone(event.target.value);
    const newAddress = (event) => setGetAddress(event.target.value);

    const storeData = () => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            user_name: name,
            phone_number: phone,
        }));
        setIsClick(false); // 儲存後退出編輯模式
    };

    const handleChange = (event) => setValue(event.target.value);

    const storeAddress=()=>{
        setIsModify(false);
        setFullAddress(getNewAddress);
    }

    const [selectedChip, setSelectedChip] = useState("$30");
    const handleChipClick = (value) => {
        setSelectedChip(value); // 設定當前選中的 Chip 值
    };
    const now = new Date();
    const formattedDate = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;



    useEffect(() => {
        console.log(formattedDate); // 2024年12月12日02:14:55
    }, [formattedDate]);
    const correctOrder=  async()=>{

        porpRecordOrder({
            state: "waiting",
            time: now,
            payment_method:value,
            name: name,
            phone:phone,
            address:fullAddress,
            how_to_take:takeMethod.how_to_take,
            tips: selectedChip,
            meal_content:orderSummary,
            userId:getuserInfo.userId,
            storeId:getStoreId,
        })

        try {
            // 準備 payload 資料
            // 發送 POST 請求
            const response = await axios.post("http://localhost:8080/orders/add", {
                state: "waiting",
                time: formattedDate,
                payment_method:value,
                name: name,
                phone:phone,
                address:fullAddress,
                how_to_take:takeMethod.how_to_take,
                tips: selectedChip,
                meal_content:orderSummary,
                userId:getuserInfo.userId,
                storeId:getStoreId,
            });
            // 如果成功，輸出結果
            console.log("Order Detail Created:", response.data);
            navigate("/follow-order");
        } catch (error) {
            // 如果出現錯誤，顯示錯誤訊息
            console.error("Error creating order detail:", error);
        }

        //navigate("/follow-order");
    };


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
    //             const response = await axios.post("http://localhost:8080/orders/add", {
    //                     state: "waiting",
    //                     time: now,
    //                     payment_method:value,
    //                     name: name,
    //                     phone:phone,
    //                     address:fullAddress,
    //                     how_to_take:changeTake,
    //                     tips: selectedChip,
    //                     meal_content:orderSummary,
    //                     userId:getuserInfo.user_id,
    //                     storeId:getStoreId,

    //             });
    //
    //             // 如果成功，輸出結果
    //             console.log("Order Detail Created:", response.data);
    //         } catch (error) {
    //             // 如果出現錯誤，顯示錯誤訊息
    //             console.error("Error creating order detail:", error);
    //         }
    //     };


    //console.log(recordOrder);

    return (
        <div className="background">
            <div className="move_text2">
                {take ? (
                    <>
                        <div className="address">
                            <div style={{ marginLeft: "20px" }}>
                                <h2 >外帶自取地點</h2>
                                <div>
                                    <PlaceIcon />
                                    {getStoreName}
                                </div>
                            </div>
                        </div>
                        <div className="order" >
                            <div style={{marginLeft: "20px"}}>
                                <h2 >您的訂單</h2>
                                <div>
                                    {storeName}
                                </div>
                                <div>
                                    {orderInfo.map((order, index) => (
                                        <div key={index}>
                                            {order.meal_number} x {order.meal_name}
                                        </div>
                                    ))}
                                </div>
                                <div style={{fontWeight: '300', color: '#808080'}}>
                                    小計 ${total_price}
                                </div>
                                <div style={{fontWeight: '300', color: '#808080'}}>
                                    預訂方案 外送服務費 免費
                                </div>
                                <div style={{fontWeight: '300', color: '#808080'}}>
                                    小額訂單費用 $ 0
                                </div>
                                <div style={{fontWeight: '300', color: '#808080'}}>
                                    平台費 $ 1

                                </div>
                                <div style={{fontWeight: '300', color: '#808080'}}>
                                    提袋/包材費 $ 2
                                </div>
                                <div>
                                    總計 {total_price}元
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            <div style={{marginLeft: "20px"}}>
                                <h2 style={{ margin: '0', padding: '0', }}>
                                    個人資料
                                    {isClick ? (
                                        <Button sx={{color: "black"}} onClick={clickCancel}>
                                            取消
                                        </Button>
                                    ) : (
                                        <Button sx={{color: "black"}} onClick={clickModifyData}>
                                            編輯
                                        </Button>
                                    )}
                                </h2>
                                {isClick ? (
                                    <>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="電子郵件"
                                                value={userInfo.mail}
                                            />
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <TextField
                                                id="outlined-helperText"
                                                label="姓名"
                                                value={name}
                                                onChange={newName}
                                            />
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <TextField
                                                id="outlined-helperText"
                                                label="手機號碼"
                                                value={phone}
                                                onChange={newPhoneNumber}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: "300px",
                                                    height: "40px",
                                                    backgroundColor: "#e04c7f",
                                                    marginTop: "10px",
                                                }}
                                                onClick={storeData}
                                            >
                                                儲存
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>{userInfo.user_name}</div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {userInfo.mail}
                                        </div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {userInfo.phone_number}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="payment">
                            <div style={{ marginLeft: "20px" }}>
                                <h2 >付款方式</h2>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="credit_card"
                                            control={<Radio />}
                                            label="信用卡"
                                        />
                                        <FormControlLabel
                                            value="LinePay"
                                            control={<Radio />}
                                            label="LinePay"
                                        />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="invoice">
                            <div style={{ marginLeft: "20px" }}>
                                <FormControlLabel control={<Checkbox />} label="增加統一編號" />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            sx={{
                                width: "300px",
                                height: "40px",
                                backgroundColor: "#e04c7f",
                                marginLeft: "40px",
                                marginTop: "10px",
                            }}
                            onClick={correctOrder}
                        >
                            訂購外帶自取訂單
                        </Button>
                    </>
                ):(
                    <>
                        <div className="address">
                            <div style={{marginLeft: "20px",fontSize: '18px'}}>
                                <h2 >
                                    送餐地址
                                    {isModify ? (
                                        <Button sx={{color: "black"}} onClick={clickCancelAddress}>
                                            取消
                                        </Button>
                                    ) : (
                                        <Button sx={{color: "black"}} onClick={clickModifyAddress}>
                                            修改
                                        </Button>
                                    )}
                                </h2>
                                <div>
                                    {isModify ? (
                                        <>
                                            <div style={{marginTop: "10px"}}>
                                                <PlaceIcon/>
                                                <TextField
                                                    id="outlined-helperText"
                                                    label="地址"
                                                    value={getNewAddress}
                                                    onChange={newAddress}
                                                />
                                            </div>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: "300px",
                                                    height: "40px",
                                                    backgroundColor: "#e04c7f",
                                                    marginTop: "10px",
                                                }}
                                                onClick={storeAddress}
                                            >
                                                儲存
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{marginTop: "10px"}}>
                                                <PlaceIcon/>
                                                {fullAddress}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="order">
                            <div style={{marginLeft: "20px"}}>
                                <h2 >您的訂單</h2>
                                <div>
                                    {storeName}
                                </div>
                                <div>
                                    {orderInfo.map((order, index) => (
                                        <div key={index}>
                                            {order.meal_number} x {order.meal_name} ${order.meal_price}
                                        </div>
                                    ))}
                                </div>
                                <div style={{fontWeight: '300', color: '#808080',fontSize: '18px'}}>
                                    小計 ${total_price}
                                </div>
                                <div style={{fontWeight: '300', color: '#808080',fontSize: '18px'}}>
                                    預訂方案 外送服務費 免費
                                </div>
                                <div style={{fontWeight: '300', color: '#808080', fontSize: '18px'}}>
                                    小額訂單費用 $ 0
                                </div>
                                <div style={{fontWeight: '300', color: '#808080',fontSize: '18px'}}>
                                    平台費 $ 1

                                </div>
                                <div style={{fontWeight: '300', color: '#808080',fontSize: '18px'}}>
                                    提袋/包材費 $ 2
                                </div>
                                <div style={{fontSize: '18px'}}>
                                    總計 {total_price}元
                                </div>
                            </div>
                        </div>
                        <div style={{fontSize: '18px'}} className="data">
                        <div style={{marginLeft: "20px"}}>
                            <h2 >
                                    個人資料
                                    {isClick ? (
                                        <Button sx={{color: "black"}} onClick={clickCancel}>
                                            取消
                                        </Button>
                                    ) : (
                                        <Button sx={{color: "black"}} onClick={clickModifyData}>
                                            編輯
                                        </Button>
                                    )}
                                </h2>
                                {isClick ? (
                                    <>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="電子郵件"
                                                value={userInfo.mail}
                                            />
                                        </div>
                                        <div style={{marginTop: "10px"}}>
                                            <TextField
                                                id="outlined-helperText"
                                                label="姓名"
                                                value={name}
                                                onChange={newName}
                                            />
                                        </div>
                                        <div style={{marginTop: "10px"}}>
                                            <TextField
                                                id="outlined-helperText"
                                                label="手機號碼"
                                                value={phone}
                                                onChange={newPhoneNumber}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: "300px",
                                                    height: "40px",
                                                    backgroundColor: "#e04c7f",
                                                    marginTop: "10px",
                                                }}
                                                onClick={storeData}
                                            >
                                                儲存
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>{userInfo.user_name}</div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {userInfo.mail}
                                        </div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {userInfo.phone_number}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="payment">
                            <div style={{marginLeft: "20px"}}>
                                <h2 >付款方式</h2>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="credit_card"
                                            control={<Radio/>}
                                            label="信用卡"
                                        />
                                        <FormControlLabel
                                            value="LinePay"
                                            control={<Radio/>}
                                            label="LinePay"
                                        />
                                        <FormControlLabel
                                            value="cash"
                                            control={<Radio />}
                                            label="現金"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="invoice">
                            <div style={{marginTop: '5px', marginLeft: '20px', fontSize: '18px'}}>
                                <FormControlLabel control={<Checkbox/>} label="增加統一編號"/>
                            </div>
                        </div>
                        <div className="data">
                            <div style={{marginLeft: "20px"}}>
                            <h2>
                                    提供外送夥伴小費
                                </h2>
                                <h3 style={{
                                    marginTop:"-10px",
                                    color:"gray"
                                }}>
                                    外送夥伴可獲得全額小費
                                </h3>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                    <Chip label="下次再說"
                                          variant={selectedChip === "nextTime" ? "filled" : "outlined"}
                                          onClick={() => handleChipClick("nextTime")} />
                                    <Chip label="$15"
                                          variant={selectedChip === "$15" ? "filled" : "outlined"}
                                          onClick={() => handleChipClick("$15")} />
                                    <Chip label="$30"
                                          variant={selectedChip === "$30" ? "filled" : "outlined"}
                                          onClick={() => handleChipClick("$30")} />
                                    <Chip label="$50"
                                          variant={selectedChip === "$50" ? "filled" : "outlined"}
                                          onClick={() => handleChipClick("$50")} />
                                    <Chip label="$100"
                                          variant={selectedChip === "$100" ? "filled" : "outlined"}
                                          onClick={() => handleChipClick("$100")}/>
                                </Stack>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            sx={{
                                width: "300px",
                                height: "40px",
                                backgroundColor: "#e04c7f",
                                marginLeft: "40px",
                                marginTop: "20px",
                            }}
                            onClick={correctOrder}
                        >
                            訂購外帶自取訂單
                        </Button>
                        <div style={{ height: '50px' }}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Payment_Method;
