import React from "react";
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';

function LoginModal({isOpen, onClose, origin_state }) {
    //origin_state是原始登入狀態
    if(!isOpen) return null; //未開啟登入頁面就不作動作
    //console.log(isOpen);
    //console.log(origin_state);

    const handleBackgroundClick = (event) => {
      //點擊背景時關閉
        if (event.target === event.currentTarget) {
            onClose(); //條用onclose函數
        }
    }

    const closeLoginBox = () => {
      onClose();
    }
    return(
        <div className="login_background" onClick={handleBackgroundClick}>
            <div className="login_box">
                <IconButton className="close_icon_button" onClick={closeLoginBox}>
                    <HighlightOffOutlinedIcon/>
                </IconButton>
                <h2>歡迎!</h2>
                <div>註冊或登入</div>
            </div>
        </div>
    );
}

export default LoginModal;