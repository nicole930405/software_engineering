import React, {useState} from "react";
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';

function Login_Signin({isOpen, onClose, origin_state, now_stage }) {
    //origin_state是原始登入狀態,你可以用來判斷有沒有登入
    //now_stage是用來記錄操作登入界面後的現在登入狀態(如果有登入的話幫我回傳true, 沒有的話繼續回傳false)

    //console.log(isOpen);
    //console.log(origin_state);

    const handleBackgroundClick = (event) => {
      //點擊背景時關閉
        if (event.target === event.currentTarget) {
            onClose(); //調用onclose函數
        }
    }

    const closeLoginBox = () => {
        //按下叉叉關閉視窗
      onClose();
    }

    return isOpen ? (
        <div className="login_background" onClick={handleBackgroundClick}>
            <div className="login_box">
                <IconButton className="close_icon_button" onClick={closeLoginBox}>
                    <HighlightOffOutlinedIcon/>
                </IconButton>
                <h2>歡迎!</h2>
                <div>註冊或登入</div>
            </div>
        </div>
    ) : null;
}

export default Login_Signin;