// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import Login_Signin from "./LoginModal/Login_Signin";
import Enter_Address from "./search_address/Enter_Address";
import Function_List from "./LoginModal/Function_List";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function App() {

    const [IsLogIn, setIsLogIn] = useState(true); //預設登入狀態(可自己調T、F)
    const [LoginModalOpen, setLoginModalOpen] = useState(false); //登入頁面
    const [FunctionList, setFunctionList] = useState(false) //以登入的使用者功能
    //const navigate = useNavigate(); //轉跳頁便用

    const [lng, setLng] = useState(null); //經度
    const [lat, setLat] = useState(null); //緯度

    const [address, setAddress] = useState("");

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

    const handleLngLat = (data1, data2) => {
      setLng(data1);
      setLat(data2);


    }

    useEffect(() => {
        if (lng !== null && lat !== null) {
            //console.log(`經度: ${lng}, 緯度: ${lat}`);
        }
    }, [lng, lat]);



  return (
    <div className="background">
      <div className="top_bar">
          <div className="component_container">
                  <IconButton className="person_icon">
                    <PersonOutlineOutlinedIcon onClick={handleIconClick_person}  style={{color:"black"}}/>
                  </IconButton>
              <div className="food_panda_color">
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
                          user
                      </Button>
                  </>
              )}
              {/*未登入時顯示登入的按鈕 登入時顯示功能表*/}

              <IconButton className="shopping_car_icon">
                  <ShoppingCartOutlinedIcon style={{color:"black"}} onClick={handleIconClick_shopping_cart}/>
              </IconButton>


          </div>
      </div> {/*最上面那一條*/}
        <div className="move_text">
            <div>從美食到生鮮雜貨 上千萬種商品</div>
            <div>馬上點馬上到</div>
        </div>
        {/*未登入*/}
        <Login_Signin isOpen={LoginModalOpen} onClose={closeLoginModal} origin_state={IsLogIn} now_stage={handle_setIsLogIn}/>
        <Enter_Address  getLngLat = {handleLngLat} getAddress={setAddress}/>
        <Function_List isOpen = {FunctionList} onClose ={closeFunctionList} />
        {/*{console.log(lng)}*/}
        {/*{console.log(address)}*/}

    </div>
  );
}

export default App;
