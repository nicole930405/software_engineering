import React, { useState, useEffect } from "react";
import "../App.css";
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

const Payment_Method = ({ getAddress, User, takeMethod }) => {
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
                acc[fieldNames[index]] = "桃園";
            }
            return acc;
        }, {});
    //console.log(address);
    const [fullAddress, setFullAddress] = useState(`${address.城市}${address.區}${address.路}`);
    // let fullAddress = `${address.城市}${address.區}${address.路}`
    const [isClick, setIsClick] = useState(false);
    const [isModify, setIsModify] = useState(false);

    const [name, setName] = useState(User.user_name);
    const [phone, setPhone] = useState(User.phone_number);
    const [getNewAddress, setGetAddress] = useState(User.address);
    const [take, setTake] = useState(false); // 初始值為 false
    const [value, setValue] = useState("credit_card");

    const [orderUser, setOrderUser] = useState({
        user_name: name,
        phone_number: phone,
        mail: User.mail,
    });

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
        setOrderUser((prevOrderUser) => ({
            ...prevOrderUser,
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

    const [recordOrder, setRecordOrder] = useState({
        user_name: "",
        phone_number: "",
        address:"",
        payment_method:"",
        how_to_take:take,
        tips:""
    })

    const correctOrder=()=>{
        setRecordOrder({
            user_name: name,
            phone_number: phone,
            address:fullAddress,
            payment_method:value,
            tips:selectedChip,
            how_to_take:take
        })
    }

    console.log(recordOrder);

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
                                                value={orderUser.mail}
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
                                        <div>{orderUser.user_name}</div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {orderUser.mail}
                                        </div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {orderUser.phone_number}
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
                                                value={orderUser.mail}
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
                                        <div>{orderUser.user_name}</div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {orderUser.mail}
                                        </div>
                                        <div
                                            style={{
                                                color: "gray",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {orderUser.phone_number}
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
