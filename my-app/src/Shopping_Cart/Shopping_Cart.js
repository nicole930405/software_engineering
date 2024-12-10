import React, {useEffect, useState} from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";//轉跳頁面

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Shopping_Cart = ({setTakeMethod,getTotalMeal,setShoppingCartInfo, setTotal_Price}) => {
    const navigate = useNavigate();
    const [mealList, setMealList] = useState(getTotalMeal);
    const [originPrice, setOriginPrice] = useState(0);

    useEffect(() => {
        const calculatedPrices = mealList.map((meal) =>
            meal.meal_number > 0 ? meal.meal_price / meal.meal_number : 0
        );
        setOriginPrice(calculatedPrices);
    }, [mealList]);

    const[recordButton, setRecordButton] = useState(true);//外帶
    const [checked, setChecked] = React.useState(true);

    const [recordChoose, setRecordChoose] = useState({
        how_to_take:''
    });
    useEffect(() => {
        console.log(mealList);

    }, [mealList]);



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
    setTakeMethod(recordChoose);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const changPage =()=>{
        navigate("/payment-method")
    }

    const [isClick, setIsClick] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const calculateTotalPrice = (updatedList) => {
        const total = updatedList.reduce((sum, meal) => sum + meal.meal_price, 0);
        setTotalPrice(total);
        setTotal_Price(total);
    };

    const calculateTotalPriceSub = (updatedList) => {
        const total = updatedList.reduce((sum, meal) => sum - meal.meal_price, 0);
        setTotalPrice(total);
        setTotal_Price(total);
    };

    const clickAdd = (index) => {
        setMealList((prevList) =>
            prevList.map((meal, i) =>
                i === index
                    ? { ...meal,
                        meal_number: meal.meal_number + 1,
                        meal_price: meal.meal_price + meal.meal_price / meal.meal_number // 總價加單價
                    } // 指定餐點數量加一
                    : meal
            )
        );

        setIsClick(true);
    };


    const clickSub=(index) => {
        setMealList((prevList) =>
            prevList.map((meal, i) =>
                i === index
                    ? {
                        ...meal,
                        meal_number: meal.meal_number > 1 ? meal.meal_number - 1 : 1,// 不再減少到 0 以下
                        meal_price: meal.meal_price - meal.meal_price / meal.meal_number
                    }
                    : meal
            )
        );

        setIsClick(true);
    }

    useEffect(() => {
        console.log(mealList);
        setShoppingCartInfo(mealList);
        calculateTotalPrice(mealList)
    }, [mealList]);

    const handleDelete = (index) => {
        setMealList((prevList) => prevList.filter((_, i) => i !== index));
    };




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
                    你的餐點
                </div>
                <div>
                    {mealList.map((meal, index) => (
                        <div key={index}>
                            <div>
                                {meal.meal_name}
                            </div>
                            <div>
                                ${meal.meal_price}

                                        <Button
                                            aria-label={meal.meal_number === 1 ? "delete" : "reduce"}
                                            onClick={() => {
                                                meal.meal_number === 1 ? handleDelete(index) : clickSub(index)
                                            }}
                                            sx={{
                                                marginLeft:'30px',
                                            }}
                                        >
                                            {meal.meal_number === 1 ? (
                                                <DeleteIcon fontSize="small" />
                                            ) : (
                                                <RemoveIcon fontSize="small" />
                                            )}
                                        </Button>
                                        {meal.meal_number}
                                        <Button
                                            aria-label="increase"
                                            onClick={() => clickAdd(index)}

                                        >
                                            <AddIcon fontSize="small"/>
                                        </Button>

                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    小計
                    {totalPrice}
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
