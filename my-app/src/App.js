// import logo from './logo.svg';
import './App.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import LoginModal from "./LoginModal/LoginModal";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function App() {

    const [IsLogIn, setIsLogIn] = useState(false); //預設未登入
    //const [IsSignUp, setIsSignUp] = useState(false); //預設未註冊
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    //const navigate = useNavigate(); //轉跳頁便用

    const handleIconClick = () => {
      if (!IsLogIn) {
          //未登入
        setLoginModalOpen(true);
        // console.log(LoginModalOpen);
      }
    }

    const closeLoginModal = () => {
        setLoginModalOpen(false)
    }
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
      </div>
        <LoginModal isOpen={LoginModalOpen} onClose={closeLoginModal}/>
    </div>
  );
}

export default App;
