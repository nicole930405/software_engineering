import React, {useState} from "react";
import axios from 'axios';
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';

function Login_Signin({isOpen, onClose, origin_state, now_stage, getUser }) {
    //origin_state是原始登入狀態,你可以用來判斷有沒有登入
    //now_stage是用來記錄操作登入界面後的現在登入狀態(如果有登入的話幫我回傳true, 沒有的話繼續回傳false)

    //getUser裡面有user_id, user_name phone_number mail password address，你幫我到時候把user_id user_name計進去

    //console.log(isOpen);
    //console.log(origin_state);
    // 儲存email和錯誤信息
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false); // 用來儲存電子郵件是否有效
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // 顯示 email 輸入框的狀態
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    //123

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
        console.log("登入按鈕被點擊"); // Debug message
        setShowEmailInput(true);
    };

    const handleSignupClick = () => {
        // 處理註冊按鈕點擊事件
        //now_stage(true); // 假設點擊後設定已登入

        console.log("註冊按鈕被點擊");
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    // 檢查電子郵件是否存在於資料庫
    const checkEmailExistence = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/1`);
            if (response.data) {
                // 如果email存在，顯示密碼輸入框
                setShowPasswordInput(true);
                setEmailError("");  // 清除錯誤信息
            } else {
                // 如果email不存在，顯示錯誤信息
                setEmailError("該電子郵件未註冊");
                setShowPasswordInput(false);  // 隱藏密碼輸入框
            }
        } catch (error) {
            console.error("Email 檢查失敗:", error);
            setEmailError("檢查電子郵件時出錯");
            setShowPasswordInput(false);  // 遇錯誤時隱藏密碼框
        }
    };




    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);

        // 檢查電子郵件格式是否有效
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(emailInput)) {
            setEmailError(""); // 格式正確，清除錯誤信息
            setIsEmailValid(true); // 設置為有效
        } else {
            setIsEmailValid(false); // 設置為無效
        }
    };


    const handleSubmitEmail = async () => {
        if (isEmailValid) {
            console.log("電子郵件格式正確，提交表單");
            // 確保在檢查電子郵件是否存在後再更新密碼框的顯示
            await checkEmailExistence();  // 使用 await 等待結果
        } else {
            console.log("電子郵件格式不正確");
        }
    };



    const handleSubmitPassword = () => {  // 如果此函數未定義，會報錯
        if (password === "") {
            setPasswordError("請輸入密碼");
        } else {
            setPasswordError("");
            checkPassword();
        }
    };
    // 檢查密碼是否正確
    const checkPassword = async () => {
        try {
            // 這裡假設後端會返回 user 資料，並比較密碼
            const response = await axios.get(`http://localhost:8080/user/${email}`);
            if (response.data && response.data.password === password) {
                // 如果密碼正確
                console.log("登入成功");
                now_stage(true); // 設置登入狀態
                onClose(); // 關閉視窗
            } else {
                setPasswordError("密碼錯誤");
            }
        } catch (error) {
            console.error("密碼檢查失敗:", error);
            setPasswordError("檢查密碼時出錯");
        }
    };

    return isOpen ? (
        <div className="login_background" onClick={handleBackgroundClick}>
            <div className="login_box">
                <IconButton className="close_icon_button" onClick={closeLoginBox}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
                <h2>歡迎!</h2>
                {!showEmailInput && !showPasswordInput && (
                    <div className="button_group">
                        <button className="login_button" onClick={handleLoginClick}>
                            登入
                        </button>
                        <button className="signup_button" onClick={handleSignupClick}>
                            註冊
                        </button>
                    </div>
                )}
                {/* 電子郵件輸入框 */}
                {showEmailInput && (
                    <>
                        <div className="email_input_box">
                            <input
                                type="email"
                                placeholder="電子郵件"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button
                                className="submit_button_box"
                                onClick={handleSubmitEmail}
                                disabled={!isEmailValid} // 如果email格式不正確，禁用按鈕
                                style={{
                                    backgroundColor: !isEmailValid ? '#ccc' : '#c21760', // 格式不對時背景顏色為灰色
                                    cursor: !isEmailValid ? 'not-allowed' : 'pointer', // 禁用時鼠標顯示為禁用
                                }}
                            >
                                繼續
                            </button>
                        </div>
                        {emailError && <p className="error_message">{emailError}</p>}
                    </>
                )}

                        {/* 密碼輸入框 */}
                        {showPasswordInput && (
                            <div className="password_input_box">
                                <input
                                    type="password"
                                    placeholder="請輸入您的密碼"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button onClick={handleSubmitPassword}>提交</button>
                                {passwordError && <p className="error_message">{passwordError}</p>}
                            </div>
                        )}
                    </div>
                    </div>
                    ) : null;
                }

                export default Login_Signin;
