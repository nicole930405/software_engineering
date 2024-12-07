import React, { useState } from "react";
import axios from 'axios';
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';
import emailjs from 'emailjs-com';

function Login_Signin({ isOpen, onClose}) {
    const [email, setEmail] = useState("");  // 儲存用戶輸入的電子郵件
    const [emailError, setEmailError] = useState("");  // 儲存電子郵件錯誤信息
    const [isEmailValid, setIsEmailValid] = useState(false);  // 驗證電子郵件格式是否正確
    const [showPasswordInput, setShowPasswordInput] = useState(false);  // 控制是否顯示密碼輸入框
    const [name, setName] = useState("");  // 儲存註冊用戶的姓名
    const [phoneNumber, setPhoneNumber] = useState("");  // 儲存註冊用戶的電話
    const [isRegistering, setIsRegistering] = useState(false);  // 控制是否進行註冊流程
    const [registerPassword, setRegisterPassword] = useState("");  // 儲存註冊時的密碼

    const [verificationCode, setVerificationCode] = useState("");  // 存儲生成的驗證碼
    const [userInputCode, setUserInputCode] = useState("");  // 存儲用戶輸入的驗證碼
    const [showVerificationInput, setShowVerificationInput] = useState(false); // 控制是否顯示驗證碼輸入框
    const [isCodeValid, setIsCodeValid] = useState(false); // 驗證碼是否有效

    // 背景區域點擊時關閉登錄框
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const closeLoginBox = () => {
        onClose();
    };

    // 處理電子郵件輸入變更
    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // 檢查電子郵件格式是否正確
        if (emailPattern.test(emailInput)) {
            setEmailError("");  // 清除錯誤信息
            setIsEmailValid(true);  // 設置電子郵件格式為有效
        } else {
            setIsEmailValid(false);  // 設置電子郵件格式為無效
        }
    };

    // 處理提交電子郵件
    const handleSubmitEmail = async () => {
        if (isEmailValid) {
            await checkEmailExistence();  // 如果電子郵件格式有效，檢查電子郵件是否已註冊
        }
    };

    // 檢查電子郵件是否已註冊
    const checkEmailExistence = async () => {
        try {
            const response = await axios.post("http://localhost:8080/user/byMail", { mail: email });

            if (response.data) {
                setEmailError("該電子郵件已註冊");  // 如果已註冊，顯示錯誤信息
                setShowPasswordInput(true);  // 顯示密碼輸入框
            } else {
                setEmailError("");  // 清除錯誤信息
                setShowVerificationInput(true);  // 顯示驗證碼輸入框
                generateVerificationCode();  // 生成驗證碼
            }
        } catch (error) {
            console.error("Email 檢查失敗:", error);
            if (error.response && error.response.status === 404) {
                setEmailError("該電子郵件尚未註冊");  // 如果電子郵件尚未註冊，顯示相應錯誤信息
                setShowVerificationInput(true);  // 顯示驗證碼輸入框
                generateVerificationCode();  // 生成驗證碼
            } else {
                setEmailError("檢查電子郵件時出錯，請稍後再試");  // 顯示通用錯誤信息
            }
        }
    };

    // 生成隨機驗證碼並發送郵件
    const generateVerificationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000);  // 生成6位隨機數字
        setVerificationCode(code);  // 設置驗證碼
        console.log("生成的驗證碼:", code);
        const templateParams = {
            to_name: email,  // 收件人姓名（用戶電子郵件）
            from_name: "kyle",  // 發件人名稱
            verification_code: code,  // 生成的驗證碼
            to_email: email,  // 收件人電子郵件
        };
        emailjs.send(
            'service_5dih0ft',  // 服務 ID
            'template_h133v1b',  // 模板 ID
            templateParams,
            'l66iH9Aljyjc_k-7T'  // 用戶 ID
        )
    };

    // 處理用戶輸入的驗證碼變更
    const handleVerificationCodeChange = (event) => {
        setUserInputCode(event.target.value);
    };

    // 驗證用戶輸入的驗證碼
    const verifyCode = () => {
        if (userInputCode === verificationCode.toString()) {
            setIsCodeValid(true);  // 設置驗證碼為有效
            alert("驗證成功！請完成註冊");
            setIsRegistering(true);  // 進入註冊流程
        } else {
            setIsCodeValid(false);  // 設置驗證碼為無效
            alert("驗證碼錯誤！");
        }
    };

    // 註冊提交，將用戶信息送至後端
    const handleRegisterSubmit = async () => {
        if (name && phoneNumber && registerPassword) {  // 檢查是否填寫所有必填欄位
            const newUser = {
                user_name: name,
                phone_number: phoneNumber,
                mail: email,
                password: registerPassword,
                address: ""  // 默認地址為空
            };

            try {
                const response = await axios.post(`http://localhost:8080/user/addUser`, newUser);
                if (response.status === 201) {
                    alert("註冊成功！");
                    setIsRegistering(false);  // 註冊成功後退出註冊流程
                    setShowPasswordInput(true);  // 顯示密碼輸入框
                }
            } catch (error) {
                console.error("註冊失敗:", error);
                alert("註冊失敗，請稍後再試。");
            }
        } else {
            alert("請填寫所有欄位！");  // 提示用戶填寫所有必要欄位
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
                {!showVerificationInput && !showPasswordInput && !isRegistering && (
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

                {/* 顯示驗證碼輸入框 */}
                {showVerificationInput && !isCodeValid && (
                    <>
                        <p>{email}</p>

                        <div className="verification_input_box">
                            <input
                                type="text"
                                placeholder="輸入驗證碼"
                                value={userInputCode}
                                onChange={handleVerificationCodeChange}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button
                                className="submit_button_box"
                                onClick={verifyCode}
                            >
                                驗證
                            </button>
                        </div>
                    </>
                )}

                {/* 註冊表單 */}
                {isRegistering && (
                    <>
                        <p>{email}</p>

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
                        <div className="password_input_box">
                            <input
                                type="password"
                                placeholder="密碼"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button onClick={handleRegisterSubmit}>
                                建立帳戶
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    ) : null;
}

export default Login_Signin;
