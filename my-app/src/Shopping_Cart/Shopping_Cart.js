import React, {useState} from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";//轉跳頁面

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

const Shopping_Cart = () => {
    const navigate = useNavigate();
    const[recordButton, setRecordButton] = useState(true);//外帶
    const [checked, setChecked] = React.useState(true);

    const [recordChoose, setRecordChoose] = useState({
        how_to_take:''
    });

    const chooseTake =()=>{
        setRecordButton(false);
        setRecordChoose((prev) =>({
            ...prev,
            how_to_take: '自取'
        }))
    }

    const chooseBring =() =>{
        setRecordButton(true);
        setRecordChoose((prev) =>({
            ...prev,
            how_to_take: '外帶'
        }))
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const changPage =()=>{
        navigate("/payment-method")
    }


    return (
        <div className="background">
            <div className="move_text">
                <div className="rounded_box">
                    {recordButton ? (
                        <>
                            <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        border: '1px solid #bebebe',
                                        color: 'black',
                                        width: '140px',
                                        height: '90px',
                                        marginTop: '5px',
                                        boxShadow: 'none',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            boxShadow: 'none',  // 懸停狀態也無陰影
                                            //backgroundColor: 'white', // 背景顏色不變
                                        },
                                    }}
                            >
                                外帶
                            </Button>
                            <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                        width: '140px',
                                        height: '90px',
                                        marginTop: '5px',
                                        boxShadow: 'none',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            boxShadow: 'none',  // 懸停狀態也無陰影
                                            backgroundColor: '#bebebe',
                                        },
                                    }}
                                    onClick={chooseTake}
                            >
                                自取
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                        width: '140px',
                                        height: '90px',
                                        marginTop: '5px',
                                        boxShadow: 'none',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            boxShadow: 'none',  // 懸停狀態也無陰影
                                            backgroundColor: '#bebebe', // 背景顏色不變
                                        },
                                    }}
                                    onClick={chooseBring}
                            >
                                外帶
                            </Button>
                            <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        border: '1px solid #bebebe',
                                        color: 'black',
                                        width: '140px',
                                        height: '90px',
                                        marginTop: '5px',
                                        boxShadow: 'none',
                                        marginLeft: '5px',
                                        '&:hover': {
                                            boxShadow: 'none',  // 懸停狀態也無陰影
                                        },
                                    }}
                            >
                                自取
                            </Button>
                        </>
                    )}
                </div>
                <div>
                    小計
                </div>
                <div>
                    請問你需要免洗餐具、吸管嗎?
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'controlled'}}
                        sx={{
                            '& .MuiSwitch-switchBase': {
                                color: 'black', // 滑桿默認顏色
                                '&.Mui-checked': {
                                    color: 'black', // 滑桿選中時的顏色
                                },
                                '&.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: 'black', // 選中時的背景色
                                },
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: '#ccc', // 未選中時的背景色
                            },
                        }}
                    />
                </div>
                {checked ? (
                    <>
                        <div style={{fontSize: '12px', fontWeight: '300', color: '#333'}}>
                            如有提供，你的餐點會附上餐具
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{fontSize: '12px', fontWeight: '300', color: '#333'}}>
                            不提供餐具，謝謝你幫忙減少不必要的浪費
                        </div>
                    </>
                )}
                <div>
                    總計
                </div>
                <Button variant="contained"
                        sx={{
                            width: '300px',
                            height: '40px',
                            backgroundColor:'#e04c7f'
                        }}
                        onClick={changPage}
                >
                    查看付款方式及地址
                </Button>
            </div>
        </div>
    );
};

export default Shopping_Cart;
