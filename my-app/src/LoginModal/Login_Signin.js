import React, { useState } from "react";
import axios from 'axios';
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';

function Login_Signin({ isOpen, onClose, origin_state, now_stage, getUser }) {
    // 儲存 email 和錯誤信息
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false); // 用來儲存電子郵件是否有效
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPasswordInput, setShowPasswordInput] = useState(false); // 控制是否顯示密碼框
    const [currentUser, setCurrentUser] = useState(null); // 儲存用戶信息
    const [name, setName] = useState(""); // 姓名
    const [phoneNumber, setPhoneNumber] = useState(""); // 電話號碼
    const [isRegistering, setIsRegistering] = useState(false); // 控制註冊表單顯示
    const [registerPassword, setRegisterPassword] = useState(""); // 用於儲存註冊密碼
    const [registerPasswordError, setRegisterPasswordError] = useState(""); // 密碼錯誤信息


    const handleBackgroundClick = (event) => {
        // 點擊背景時關閉
        if (event.target === event.currentTarget) {
            onClose(); // 調用 onClose 函數
        }
    };

    const closeLoginBox = () => {
        onClose(); // 按下叉叉關閉視窗
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
            await checkEmailExistence();
        }
    };

    const checkEmailExistence = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/byMail?mail=${email}`);
            if (response.data) {
                // 如果email存在，顯示密碼輸入框
                setCurrentUser(response.data); // 保存用户信息
                setShowPasswordInput(true);
                setEmailError("");  // 清除錯誤信息
            } else {
                // 如果email不存在，顯示錯誤信息
                setEmailError("該電子郵件未註冊");
                setShowPasswordInput(false);  // 隱藏密碼輸入框
            }
        } catch (error) {
            console.error("Email 檢查失敗:", error);
            setEmailError("");
            setShowPasswordInput(false);  // 遇錯誤時隱藏密碼框
            setIsRegistering(true);  // 出錯時顯示註冊頁面
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmitPassword = () => {
        if (password === "") {
            setPasswordError("請輸入密碼");
        } else {
            setPasswordError("");
            checkPassword();
        }
    };

    const checkPassword = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/byMail?mail=${email}`);
            if (response.data && response.data.password === password) {
                console.log("登入成功");
                setCurrentUser(response.data); // 保存當前用戶數據
                getUser(response.data); // 回傳當前使用者
                now_stage(true); // 更新登入狀態
                onClose(); // 關閉視窗
            } else {
                setPasswordError("密碼錯誤");
            }
        } catch (error) {
            console.error("密碼檢查失敗:", error);
            setPasswordError("檢查密碼時出錯");
        }
    };
    const handleRegisterPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
        setRegisterPasswordError(""); // 每次修改密码时清除错误信息
    };
    const handleRegisterSubmit = async () => {
        if (name && phoneNumber && registerPassword) {
            const newUser = {
                user_name: name,  // 用户名
                phone_number: phoneNumber,  // 电话号码
                mail: email,  // 邮箱
                password: registerPassword,  // 密码
                address: ""  // 地址默认为空
            };
            console.log("提交的用户数据:", newUser); // 添加日志，查看提交的数据

            try {
                const response = await axios.post(`http://localhost:8080/user/addUser`, newUser);
                if (response.status === 201) {
                    alert("註冊成功！");
                    setIsRegistering(false); // 注册成功后隐藏注册表单
                    setShowPasswordInput(true); // 显示密码框
                }
            } catch (error) {
                console.error("註冊失敗:", error);
                alert("註冊失敗，請稍後再試。");
            }
        } else {
            alert("請填寫所有欄位！");
        }
    };


    return isOpen ? (
        <div className="login_background" onClick={handleBackgroundClick}>
            <div className="login_box">
                <IconButton className="close_icon_button" onClick={closeLoginBox}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
                <h2>歡迎!</h2>

                {/* 電子郵件輸入框 */}
                {!showPasswordInput && !isRegistering && (
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
                                disabled={!isEmailValid}
                                style={{
                                    backgroundColor: !isEmailValid ? '#ccc' : '#c21760',
                                    cursor: !isEmailValid ? 'not-allowed' : 'pointer',
                                }}
                            >
                                繼續
                            </button>
                        </div>
                        {emailError && <p className="error_message">{emailError}</p>}
                    </>
                )}

                {/* 註冊表單 */}
                {isRegistering && (
                    <>
                        <div className="name_input_box">
                            <input
                                type="text"
                                placeholder="姓名"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="phone_input_box">
                            <input
                                type="text"
                                placeholder="電話號碼"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        {/* 密碼輸入框 */}
                        <div className="password_input_box">
                            <input
                                type="password"
                                placeholder="密碼"
                                value={registerPassword}
                                onChange={handleRegisterPasswordChange}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button onClick={handleRegisterSubmit}>
                                建立帳戶
                            </button>
                        </div>
                    </>
                )}

                {/* 密碼輸入框 */}
                {showPasswordInput && (
                    <>
                        <div className="password_input_box">
                            <input
                                type="password"
                                placeholder="密碼"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button
                                className="submit_button_box"
                                onClick={handleSubmitPassword}
                                disabled={password === ""}
                                style={{
                                    backgroundColor: password === "" ? '#ccc' : '#c21760',
                                    cursor: password === "" ? 'not-allowed' : 'pointer',
                                }}
                            >
                                使用密碼登入
                            </button>
                        </div>
                        {passwordError && <p className="error_message">{passwordError}</p>}
                    </>
                )}
            </div>
        </div>
    ) : null;

}

export default Login_Signin;
