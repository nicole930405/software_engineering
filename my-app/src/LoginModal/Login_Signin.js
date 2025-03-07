import React, { useState } from "react";
import axios from 'axios';
import '../App.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import IconButton from '@mui/material/IconButton';
import emailjs from 'emailjs-com';

function Login_Signin({isOpen, onClose, origin_state, now_stage, getUser }) {
    const [email, setEmail] = useState("");  // 儲存用戶輸入的電子郵件
    const [emailError, setEmailError] = useState("");  // 儲存電子郵件錯誤信息
    const [isEmailValid, setIsEmailValid] = useState(false);  // 驗證電子郵件格式是否正確
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPasswordInput, setShowPasswordInput] = useState(false);  // 控制是否顯示密碼輸入框
    const [name, setName] = useState("");  // 儲存註冊用戶的姓名
    const [phoneNumber, setPhoneNumber] = useState("");  // 儲存註冊用戶的電話
    const [isRegistering, setIsRegistering] = useState(false);  // 控制是否進行註冊流程
    const [registerPassword, setRegisterPassword] = useState("");  // 儲存註冊時的密碼
    const [currentUser, setCurrentUser] = useState(null); // 儲存用戶信息
    const [verificationCode, setVerificationCode] = useState("");  // 存儲生成的驗證碼
    const [userInputCode, setUserInputCode] = useState("");  // 存儲用戶輸入的驗證碼
    const [showVerificationInput, setShowVerificationInput] = useState(false); // 控制是否顯示驗證碼輸入框
    const [isCodeValid, setIsCodeValid] = useState(false); // 驗證碼是否有效

    const [isForgotPassword, setIsForgotPassword] = useState(false); // 是否啟用忘記密碼流程
    const [newPassword, setNewPassword] = useState(""); // 存儲新密碼
    const [showNewPasswordInput, setShowNewPasswordInput] = useState(false); // 是否顯示新密碼輸入框
    const [isResettingPassword, setIsResettingPassword] = useState(false); // 是否為重置密碼流程

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

    const checkEmailExistence = async () => {
        try {
            const response = await axios.post("http://localhost:8080/user/byMail", { mail: email });
            if (response.data) {
                console.log("後端返回的用戶數據：", response.data);
                setEmailError("該電子郵件已註冊");
                setCurrentUser(response.data); // 保存用戶信息
                setShowPasswordInput(true);  // 顯示密碼輸入框
            } else {
                setEmailError("");  // 清除錯誤信息
                setShowVerificationInput(true);  // 顯示驗證碼輸入框
                generateVerificationCode();  // 生成驗證碼
            }
        } catch (error) {
            console.error("Email 檢查失敗:", error);
            if (error.response && error.response.status === 404) {
                setEmailError("該電子郵件尚未註冊");
                setShowVerificationInput(true);  // 顯示驗證碼輸入框
                generateVerificationCode();  // 生成驗證碼
            } else {
                setEmailError("檢查電子郵件時出錯，請稍後再試");
            }
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
            const response = await axios.post("http://localhost:8080/user/byMail", { mail: email });
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
            'service_5dih0ft',
            'template_h133v1b',
            templateParams,
            'l66iH9Aljyjc_k-7T'
        )
    };

    // 處理用戶輸入的驗證碼變更
    const handleVerificationCodeChange = (event) => {
        setUserInputCode(event.target.value);
    };

    // 驗證用戶輸入的驗證碼
    const verifyCode = () => {
        if (userInputCode === verificationCode.toString()) {
            if (isResettingPassword) {
                setIsCodeValid(true); // 設置驗證碼有效
                setShowVerificationInput(false); // 隱藏驗證碼輸入框
                setShowNewPasswordInput(true); // 顯示新密碼輸入框
                setIsRegistering(false);
                setShowPasswordInput(false);
            } else {
                // 註冊流程
                setIsCodeValid(true); // 設置驗證碼有效
                setShowVerificationInput(false); // 隱藏驗證碼輸入框
                setIsRegistering(true); // 進入註冊流程
                setIsResettingPassword(false);
                setShowNewPasswordInput(false);
            }
        } else {
            setIsCodeValid(false); // 設置驗證碼無效
            alert("驗證碼錯誤，請重新輸入！");
        }
    };

    const resetPassword = async () => {
        if (newPassword === "") {
            alert("新密碼不能為空！");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/user/${currentUser.userId}`, {
                user_name: currentUser.user_name,
                userId: currentUser.userId,
                phone_number: currentUser.phone_number,
                mail: currentUser.mail,
                password: newPassword, // 新密碼
                address: currentUser.address, // 保持其他字段不變
            });

            if (response.status === 200) {
                alert("密碼重置成功！");
                setShowNewPasswordInput(false); // 隱藏新密碼輸入框
                setShowPasswordInput(true); // 返回密碼輸入流程
            } else {
                alert("密碼重置失敗，請稍後再試！");
            }
        } catch (error) {
            console.error("密碼重置失敗：", error);
            alert("密碼重置失敗，請稍後再試！");
        }
    };

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

                {/* 顯示電子郵件輸入框 */}
                {!showVerificationInput && !showPasswordInput && !isRegistering && !showNewPasswordInput && (
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

                {/* 密碼輸入框 */}
                {showPasswordInput && (
                    <>
                        <p>{email}</p>
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
                        <p></p>
                        <div className="submit_button_box">
                            <button
                                onClick={() => {
                                    setIsForgotPassword(true); // 進入忘記密碼流程
                                    setIsResettingPassword(true); // 設置為重置密碼流程
                                    setShowPasswordInput(false); // 隱藏密碼輸入框
                                    setShowVerificationInput(true); // 顯示驗證碼輸入框
                                    generateVerificationCode(); // 發送驗證碼
                                }}
                            >
                                忘記密碼？
                            </button>
                        </div>
                        {passwordError && <p className="error_message">{passwordError}</p>}
                    </>
                )}
                {/* 顯示新密碼輸入框 */}
                {showNewPasswordInput && (
                    <>
                        <p>{email}</p>
                        <div className="password_input_box">
                            <input
                                type="password"
                                placeholder="新密碼"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button
                                onClick={resetPassword}
                                disabled={newPassword === ""}
                                style={{
                                    backgroundColor: newPassword === "" ? '#ccc' : '#c21760',
                                    cursor: newPassword === "" ? 'not-allowed' : 'pointer',
                                }}
                            >
                                重置密碼
                            </button>
                        </div>
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
                                onChange={(e) => setUserInputCode(e.target.value)} // 更新驗證碼輸入狀態
                                maxLength={6}
                            />
                        </div>
                        <div className="submit_button_box">
                            <button
                                className="submit_button_box"
                                onClick={verifyCode}
                                disabled={!/^\d{6}$/.test(userInputCode)}
                                style={{
                                    backgroundColor: /^\d{6}$/.test(userInputCode) ? '#c21760' : '#ccc',
                                    cursor: /^\d{6}$/.test(userInputCode) ? 'pointer' : 'not-allowed',
                                }}
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
