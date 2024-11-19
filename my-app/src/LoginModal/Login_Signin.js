import React, {useState} from "react";
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';

function Login_Signin({isOpen, onClose, origin_state, now_stage, getUser }) {
    //origin_state是原始登入狀態,你可以用來判斷有沒有登入
    //now_stage是用來記錄操作登入界面後的現在登入狀態(如果有登入的話幫我回傳true, 沒有的話繼續回傳false)

    //getUser裡面有user_id, user_name，你幫我到時候把user_id user_name計進去

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

    const handleLoginClick = () => {
        // 處理登入按鈕點擊事件
        console.log("登入按鈕被點擊");
        now_stage(true); // 假設點擊後設定已登入
        onClose(); // 關閉視窗
    };

    const handleSignupClick = () => {
        // 處理註冊按鈕點擊事件
        console.log("註冊按鈕被點擊");
    };

    return isOpen ? (
        <div className="login_background" onClick={handleBackgroundClick}>
            <div className="login_box">
                <IconButton className="close_icon_button" onClick={closeLoginBox}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
                <h2>歡迎!</h2>
                <div>註冊或登入</div>
                <div className="button_group">
                    <button className="login_button" onClick={handleLoginClick}>
                        登入
                    </button>
                    <button className="signup_button" onClick={handleSignupClick}>
                        註冊
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default Login_Signin;