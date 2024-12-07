import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 轉跳頁面

import Login_Signin from "./LoginModal/Login_Signin";
import Function_List from "./LoginModal/Function_List";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Top_Bar({ set_User }) {
    const navigate = useNavigate();

    const [IsLogIn, setIsLogIn] = useState(false); // 預設登入狀態(可自己調T、F)
    const [LoginModalOpen, setLoginModalOpen] = useState(false); // 登入頁面
    const [FunctionList, setFunctionList] = useState(false); // 登入的使用者功能
    const [user, setUser] = useState(null); // 用來儲存登入的用戶資料

    useEffect(() => {
        // 假設用戶登入後會傳遞 User 資料，這裡從後端 API 獲取真實資料
        if (IsLogIn && user && user.user_id) {
            axios.get(`http://localhost:8080/user/${user.user_id}`)
                .then(response => {
                    console.log("Fetched user data:", response.data);
                    setUser(response.data); // 設定用戶資料
                    set_User(response.data); // 傳遞給父組件
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [IsLogIn, user, set_User]);

    const handleIconClick_person = () => {
        if (!IsLogIn) {
            // 未登入
            setLoginModalOpen(true);
        } else {
            // 登入後，顯示功能列表
            setFunctionList(true);
        }
    };

    const handleIconClick_shopping_cart = () => {
        if (!IsLogIn) {
            // 未登入
            setLoginModalOpen(true);
        } else {
            // 登入後，跳轉到購物車
            navigate("/shopping-cart");
        }
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false); // 關閉登入畫面
    };

    const closeFunctionList = () => {
        setFunctionList(false); // 關閉功能列表
    };

    const handle_setIsLogIn = (value) => {
        setIsLogIn(value);
    };

    const go_Home = () => {
        navigate("/"); // 返回首頁
    };

    return (
        <div className="background">
            <div className="top_bar">
                <div className="component_container">
                    <IconButton className="person_icon">
                        <PersonOutlineOutlinedIcon
                            onClick={handleIconClick_person}
                            style={{ color: "black" }}
                        />
                    </IconButton>
                    <div className="food_panda_color" onClick={go_Home}>
                        foodpanda
                    </div>
                    {!IsLogIn ? (
                        <>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "black",
                                    color: "black",
                                }}
                                className="login_button_login"
                                onClick={handleIconClick_person}
                            >
                                登入
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#e04c7f",
                                }}
                                className="login_button_signup"
                                onClick={handleIconClick_person}
                            >
                                註冊
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    boxShadow: "none",
                                    "&:hover": {
                                        boxShadow: "none",
                                    },
                                }}
                                className="personal_icon"
                                startIcon={<PersonOutlineOutlinedIcon />}
                                endIcon={<KeyboardArrowDownIcon sx={{ color: "#e04c7f" }} />}
                                onClick={handleIconClick_person}
                            >
                                <div key={user ? user.user_id : null}>
                                    {user ? user.user_name : "載入中..."}
                                </div>
                            </Button>
                        </>
                    )}

                    <IconButton className="shopping_car_icon">
                        <ShoppingCartOutlinedIcon
                            style={{ color: "black" }}
                            onClick={handleIconClick_shopping_cart}
                        />
                    </IconButton>
                </div>
            </div>
            <Login_Signin
                isOpen={LoginModalOpen}
                onClose={closeLoginModal}
                origin_state={IsLogIn}
                now_stage={handle_setIsLogIn}
                getUser={setUser}
            />
            <Function_List isOpen={FunctionList} onClose={closeFunctionList} />{/* 最上面那一條 */}
        </div>
    );
}

export default Top_Bar;
