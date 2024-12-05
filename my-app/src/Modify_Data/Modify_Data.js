import React, {useEffect, useState} from "react";
import "../App.css"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import axios from "axios";

const Modify_Data = ({User}) => {
    const [newName, setNewName] = useState(User.user_name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(User.phone_number);
    const [newMail, setNewMail] = useState(User.mail);

    const [newPassword, setNewPassword] = useState(User.password);
    const [checkPassword, setCheckPassword] = useState("");
    const [originNewPassword, setOriginNewPassword] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState(true);
    const [correct, setCorrect] =useState(true);

    const handleNewName = (event) =>{
        setNewName(event.target.value);
    }

    const handleNewPhoneNumber = (event) =>{
        setNewPhoneNumber(event.target.value);
    }

    const handleNewMail = (event) =>{
        setNewMail(event.target.value);
    }

    const handleNewPassword = (event) =>{
        setNewPassword(event.target.value);
        setOriginNewPassword(event.target.value);
    }

    const handleCheckPassword = (event) =>{
        setCheckPassword(event.target.value);
    }

    const comparePassword =() =>{
        if(User.password != checkPassword){
            setPasswordCorrect(false);
        }else{
            setPasswordCorrect(true);
        }
        if(originNewPassword == "") {
            setCorrect(false);
        }else{
            setCorrect(true);
        }
        if(passwordCorrect && correct){
            handleSubmit();
        }
    }

    const handleSubmit = async () =>{
        try {
            const response = await axios.put(`http://localhost:8080/user/${User.user_id}`,{
                user_name: newName,
                user_id:User.user_id,
                phone_number:newPhoneNumber,
                mail:newMail,
                password:newPassword,
                address:User.address
            });
        } catch (error){
            console.error("更新失敗：", error);
        }

    }

    //console.log(newName);
    //console.log(User);
    return (
        <div className="background">
            <div className="modify_data_move_text">
                <div>我的帳戶</div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="姓名"
                        defaultValue={User.user_name || ""}
                        style={{marginTop: '20px'}}
                        onChange={handleNewName}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="手機號碼"
                        defaultValue={User.phone_number || ""}
                        style={{marginTop: '20px'}}
                        onChange={handleNewPhoneNumber}
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}
                            onClick={handleSubmit}
                    >
                        儲存
                    </Button>
                </div>
                <div style={{
                    borderBottom: '1px solid gray',
                    margin: '20px 0',
                    color: 'gray'
                }}>
                </div>
                <div>電子郵件</div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="電子郵件"
                        defaultValue={User.mail || ""}
                        style={{marginTop: '20px'}}
                        onChange={handleNewMail}
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}
                            onClick={handleSubmit}
                    >
                        儲存
                    </Button>
                </div>
                <div style={{
                    borderBottom: '1px solid gray',
                    margin: '20px 0',
                    color: 'gray'
                }}>
                </div>
                <div>密碼</div>
                {passwordCorrect ? (
                    <></>
                ) : (
                    <Alert severity="error">origin password wrong, please try again.</Alert>
                )}
                {correct ? (
                    <></>
                ) : (
                    <Alert severity="error">new password empty, please enter the new password.</Alert>
                )}
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="現有密碼"
                        style={{marginTop: '20px'}}
                        type={"password"}
                        onChange={handleCheckPassword}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="新密碼"
                        style={{marginTop: '20px'}}
                        onChange={handleNewPassword}
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}
                            onClick = {comparePassword}
                    >
                        儲存
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Modify_Data;
