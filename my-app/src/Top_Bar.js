// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";//轉跳頁面

import Login_Signin from "./LoginModal/Login_Signin";
import Function_List from "./LoginModal/Function_List";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function Top_Bar({set_User}) {
    const navigate = useNavigate();

    const [IsLogIn, setIsLogIn] = useState(false); //預設登入狀態(可自己調T、F)
    const [LoginModalOpen, setLoginModalOpen] = useState(false); //登入頁面
    const [FunctionList, setFunctionList] = useState(false) //以登入的使用者功能
    const [user, setUser] = useState({
        user_id: '',
        user_name: '',
        mail:'',
        phone_number:'',
        password:'',
        address:''
    }); //user資料

    //user假設
    const [fake_user, setFakeUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/user/1")
            .then(response => {
                console.log("fetch data:", response.data);
                setFakeUsers(response.data);
                set_User(response.data);
            })
            .catch(error => {
                console.error("error fetching")
            });
    }, []);

    const handleIconClick_person = () => {
        if (!IsLogIn) {
            //未登入
            setLoginModalOpen(true);
            //console.log(LoginModalOpen);
        }else{
            //登入
            setFunctionList(true);
        }
    }

    const handleIconClick_shopping_cart = () => {
        if (!IsLogIn) {
            //未登入
            setLoginModalOpen(true);
            //console.log(LoginModalOpen);
        }else{
            //登入
            navigate("/shopping-cart");
        }
    }

    const closeLoginModal = () => {
        //login畫面
        setLoginModalOpen(false)
    }

    const closeFunctionList=() =>{
        setFunctionList(false)
    }

    const handle_setIsLogIn = (value) => {
        setIsLogIn(value);
    }


    const go_Home = () => {
        navigate("/");
    }



    return (

            <div className="background">
                <div className="top_bar">
                    <div className="component_container">
                        <IconButton className="person_icon">
                            <PersonOutlineOutlinedIcon onClick={handleIconClick_person}  style={{color:"black"}}/>
                        </IconButton>
                        <div className="food_panda_color" onClick={go_Home}>
                            foodpanda
                        </div>
                        {!IsLogIn ? (
                            <>
                                <Button variant="outlined"
                                        sx={{
                                            borderColor:'black',
                                            color:'black'
                                        }} className="login_button_login" onClick={handleIconClick_person}>
                                    登入
                                </Button>
                                <Button variant="contained"
                                        sx={{
                                            backgroundColor:'#e04c7f'
                                        }} className="login_button_signup" onClick={handleIconClick_person}>
                                    註冊
                                </Button>

                            </>
                        ):(
                            <>
                                <Button variant="contained"
                                        sx={{
                                            backgroundColor:'white',
                                            color:'black',
                                            boxShadow:'none',
                                            '&:hover':{
                                                boxShadow:'none'
                                            }
                                        }}
                                        className="personal_icon"
                                        startIcon={<PersonOutlineOutlinedIcon/>}
                                        endIcon={<KeyboardArrowDownIcon
                                            sx={{color:'#e04c7f'}}/>}
                                        onClick={handleIconClick_person}
                                >
                                    <div key={fake_user.user_id}>
                                        {fake_user.user_name}
                                    </div>
                                </Button>
                            </>
                        )}
                        {/*未登入時顯示登入的按鈕 登入時顯示功能表*/}

                        <IconButton className="shopping_car_icon">
                            <ShoppingCartOutlinedIcon style={{color:"black"}} onClick={handleIconClick_shopping_cart}/>
                        </IconButton>

                    </div>
                </div>
                <Login_Signin isOpen={LoginModalOpen} onClose={closeLoginModal} origin_state={IsLogIn} now_stage={handle_setIsLogIn} getUser={setUser}/>
                <Function_List isOpen = {FunctionList} onClose ={closeFunctionList} />{/*最上面那一條*/}
            </div>

    );
}

export default Top_Bar;
