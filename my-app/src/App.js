// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import Login_Signin from "./LoginModal/Login_Signin";
import SearchAddress from "./search_address/search_address";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function App() {

    const [IsLogIn, setIsLogIn] = useState(false); //預設未登入
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [TyrLogIn, setTyrLogIn] = useState(true); //!!!先假設登入
    //const navigate = useNavigate(); //轉跳頁便用

    const [lng, setLng] = useState(null); //經度
    const [lat, setLat] = useState(null); //緯度

    const [address, setAddress] = useState("");

    const handleIconClick = () => {
      if (!IsLogIn) {
          //未登入
        setLoginModalOpen(true);
        //console.log(LoginModalOpen);
      }
    }

    const closeLoginModal = () => {
        //login畫面
        setLoginModalOpen(false)
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
                  <PersonOutlineOutlinedIcon onClick={handleIconClick}  style={{color:"black"}}/>
              </IconButton>
              <div className="food_panda_color">
                  foodpanda
              </div>
              <Button variant="outlined"
                      sx={{
                          borderColor:'black',
                          color:'black'
                      }} className="login_button_login" onClick={handleIconClick}>
                  登入
              </Button>
              <Button variant="contained"
                      sx={{
                          backgroundColor:'#e04c7f'
                      }} className="login_button_signup" onClick={handleIconClick}>
                  註冊
              </Button>
              <IconButton className="shopping_car_icon">
                  <ShoppingCartOutlinedIcon style={{color:"black"}}/>
              </IconButton>

          </div>
      </div> {/*最上面那一條*/}
        <div className="move_text">
            <div>從美食到生鮮雜貨 上千萬種商品</div>
            <div>馬上點馬上到</div>
        </div>
        <Login_Signin isOpen={LoginModalOpen} onClose={closeLoginModal} origin_state={IsLogIn} now_stage={handle_setIsLogIn}/>
        <SearchAddress  getLngLat = {handleLngLat} getAddress={setAddress}/>
        {/*{console.log(lng)}*/}
        {console.log(address)}
    </div>
  );
}

export default App;
