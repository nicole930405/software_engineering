import React from "react";
import "../App.css"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
//1111
const Modify_Data = ({User}) => {
    console.log(User);
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
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="手機號碼"
                        defaultValue={User.phone_number || ""}
                        style={{marginTop: '20px'}}
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}>
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
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}>
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
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="現有密碼"
                        style={{marginTop: '20px'}}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="新密碼"
                        style={{marginTop: '20px'}}
                    />
                </div>
                <div>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                marginTop: '20px'
                            }}>
                        儲存
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modify_Data;
