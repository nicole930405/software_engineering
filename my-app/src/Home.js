// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";//轉跳頁面

import Enter_Address from "./search_address/Enter_Address";

const Image = styled('img')({
    width: '70%',
    height:'50%',
    borderRadius:'15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // 平滑過渡效果
    '&:hover': {
        transform: 'scale(1.1)', // 放大圖片
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // 添加陰影
        cursor: 'pointer',
    },
});


function Home({setGetAddress, User, setCity}) {
    console.log(User);
    const navigate = useNavigate(); //轉跳頁便用

    const [lng, setLng] = useState(null); //經度
    const [lat, setLat] = useState(null); //緯度

    const [address, setAddress] = useState("");
    setGetAddress(address);

    const handleLngLat = (data1, data2) => {
        setLng(data1);
        setLat(data2);
    }

    useEffect(() => {
        if (lng !== null && lat !== null) {
            //console.log(`經度: ${lng}, 緯度: ${lat}`);
        }
    }, [lng, lat]);
    const jump_to_list = (city) => {
        navigate("/store");
        setCity(city);
    }



    return (
        <div className="background">
            <div className="move_text">
                <div>從美食到生鮮雜貨 上千萬種商品</div>
                <div>馬上點馬上到</div>
            </div>
            {/*未登入*/}
            <Enter_Address getLngLat={handleLngLat} getAddress={setAddress} User={User}/>
            <div className="move_text">
                <div>想加入foodpanda嗎?</div>
                <div>與foodpanda合作，讓更多人享受你的餐點跟商品吧！</div>
                <div>想讓上百萬新顧客試試你的美食或生鮮雜貨商品嗎？讓我們來幫忙吧！</div>
                <div>該怎麼做呢？我們會協助你上傳菜單或商品清單、幫你處理訂單、訂單確認後我們將請外送夥伴前往你的商店去取件，再將餐點或商品外送給顧客們。</div>
                <div>還等什麼？一起和我們開始這個外送的旅程吧！</div>
            </div>
            <div className="move_text">
                <div>我們有在您的城市提供送餐服務!</div>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("臺北市")}
                            />
                            <div className="label">臺北市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("新北市")}
                            />
                            <div className="label">新北市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("桃園市")}
                            />
                            <div className="label">桃園市</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("台南市")}
                            />
                            <div className="label">台南市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("台東市")}
                            />
                            <div className="label">台東市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("彰化市")}
                            />
                            <div className="label">彰化市</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("嘉義市")}
                            />
                            <div className="label">嘉義市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("新竹市")}
                            />
                            <div className="label">新竹市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("花蓮市")}
                            />
                            <div className="label">花蓮市</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("高雄市")}
                            />
                            <div className="label">高雄市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("基隆市")}
                            />
                            <div className="label">基隆市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("金門縣")}
                            />
                            <div className="label">金門縣</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("苗栗市")}
                            />
                            <div className="label">苗栗市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("南投市")}
                            />
                            <div className="label">南投市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("澎湖縣")}
                            />
                            <div className="label">澎湖縣</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("台中市")}
                            />
                            <div className="label">台中市</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("屏東縣")}
                            />
                            <div className="label">屏東縣</div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("宜蘭縣")}
                            />
                            <div className="label">宜蘭縣</div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item >
                        <div>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vjFmbf1zcLK8zogzPBX5Qb37dug-8UKxug&s"
                                alt=""
                                onClick={() => jump_to_list("雲林縣")}
                            />
                            <div className="label">雲林縣</div>
                        </div>
                    </Grid>
                </Grid>

            </div>

            {/*{console.log(lng)}*/}
            {/*{console.log(address)}*/}

        </div>

    );
}

export default Home;
