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

const Payment_Method = ({ getAddress, User, takeMethod, porpRecordOrder }) => {
    const navigate = useNavigate();
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
        user_id:''
    })
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${User.user_id}`)
            .then(response => {
                //console.log("fetch data:", response.data);
                setUserInfo({
                    user_name:response.data.user_name,
                    address: response.data.address,
                    mail:response.data.mail,
                    phone_number:response.data.phone_number,
                    user_id: response.data.user_id
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
    const [value, setValue] = useState("credit_card");

    // 初始化 `take` 狀態
    useEffect(() => {
        setTake(takeMethod.how_to_take === "自取");
    }, [takeMethod]);

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

    const correctOrder=  ()=>{
        porpRecordOrder({
            order_id:'',//不知道是什麼
            state:'',//以下單 等待接單
            time:'',//2024-11-28
            payment_method:value,
            name: name,
            phone: phone,
            address:fullAddress,
            how_to_take:take,
            tips:selectedChip,
            user_id:User.user_id,
            store_id:'',//不知道是什麼
        })
        // try {
        //     const response = await axios.post(`http://localhost:8080/user/addUser`, newUser);
        //     //console.log("User created successfully:", response.data);
        //     if (response.status === 201) {
        //         alert("註冊成功！");
        //         setIsRegistering(false); // 注册成功后隐藏注册表单
        //         setShowPasswordInput(true); // 显示密码框
        //     }
        // } catch (error) {
        //     console.error("註冊失敗:", error);
        //     alert("註冊失敗，請稍後再試。");
        // }
        navigate("/follow-order");
    }

    //console.log(recordOrder);

    return (
        <div className="background">
            <div className="move_text">
                {take ? (
                    <>
                        <div className="address">
                            <div style={{ marginLeft: "20px" }}>
                                <h2>外帶自取地址</h2>
                                <div>
                                    <PlaceIcon />

                                </div>
                            </div>
                        </div>
                        <div className="order">
                            <div style={{ marginLeft: "20px" }}>
                                <h2>您的訂單</h2>
                            </div>
                        </div>
                        <div className="data">
                            <div style={{ marginLeft: "20px" }}>
                                <h2>
                                    個人資料
                                    {isClick ? (
                                        <Button sx={{ color: "black" }} onClick={clickCancel}>
                                            取消
                                        </Button>
                                    ) : (
                                        <Button sx={{ color: "black" }} onClick={clickModifyData}>
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
                                <h2>付款方式</h2>
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
                            <div style={{marginLeft: "20px"}}>
                                <h2>
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
                                <h2>您的訂單</h2>
                            </div>
                        </div>
                        <div className="data">
                            <div style={{marginLeft: "20px"}}>
                                <h2>
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
                                <h2>付款方式</h2>
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
                            <div style={{marginLeft: "20px"}}>
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
                                <Stack direction="row" spacing={1}>
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
                                marginTop: "10px",
                            }}
                            onClick={correctOrder}
                        >
                            訂購外帶自取訂單
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Payment_Method;
