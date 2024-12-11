import React, {useState,useEffect} from "react";
import "../App.css"
import axios from "axios";
import Button from "@mui/material/Button";
import Components from "./Components";
import {useNavigate } from "react-router-dom";//轉跳頁面
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {styled} from "@mui/material/styles";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';


const ModalBox = styled("div")({
    width: "500px",
    height: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    zIndex: 1001,
    position: "relative",
    overflow: "auto",
});

const ModalOverlay = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 透明黑色背景
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
});

function CitySiteStore ({getAddress, setGetId, setGetStoreName})  {
    //console.log(getAddress);
    const fieldNames = ["路", "郵遞區號", "區", "城市", "國家"];
    const [isFilterOpen, setFilterOpen] = useState(false);

    const [user, setUser] = useState({
        Keelung:["基隆市", "01"],
        Taipei:["台北市","02"],
        New_Taipei_City:["新北市", "03"],
        Taoyuan:["桃園市", "04"],
        Hsinchu:["新竹市", "05"],
        Miaoli:["苗栗縣", "07"],
        Taichung:["台中市","08"],
        Changhua:["彰化縣","09"],
        Nantou:["南投縣","10"],
        Yunlin:["雲林縣","11"],
        Chiayi:["嘉義市","12"],
        Tainan:["台南市","14"],
        Kaohsiung:["高雄市","15"],
        Pingtung:["屏東縣","16"],
        Yilan:["宜蘭縣","19"],
        Hualien:["花蓮縣","18"],
        Taitung:["台東市","17"],
        Penghu:["澎湖縣","20"],
        Kinmen:["金門縣","21"],

    });

    const [correctCity, setCorrectCity]= useState({
        Miaoli:["苗栗市", "苗栗縣"],
        Changhua:["彰化市","彰化縣"],
        Nantou:["南投市","南投縣"],
        Hualien:["花蓮市","花蓮縣"],
    })

    const [label, setLabel] = useState("");

    const get_address = getAddress
        .split(",")
        .map((item) => item.trim())
        .reduce((acc, cur, index) => {
            acc[fieldNames[index]] = cur;
            if (fieldNames[index] === "國家" && cur === "Taiwan") {
                acc[fieldNames[index]] = "台灣";
            }
            if (fieldNames[index] === "城市" && cur === "Taoyuan") {
                acc[fieldNames[index]] = "桃園市";
            }
            if (fieldNames[index] === "城市" && cur === "New Taipei City") {
                acc[fieldNames[index]] = "新北市";
            }
            if (fieldNames[index] === "城市" && cur === "Taipei") {
                acc[fieldNames[index]] = "台北市";
            }
            if (fieldNames[index] === "城市" && cur === "臺北市") {
                acc[fieldNames[index]] = "台北市";
            }
            return acc;
        }, {});

    const full_address =  `${get_address.城市}${get_address.區}${get_address.路}`

    console.log(full_address);

    const[city, setCity] = useState(get_address.城市);

    useEffect(() => {
        // 遍歷 correctCity，檢查是否有對應的錯誤城市
        for (const [correct, wrongList] of Object.entries(correctCity)) {
            if (wrongList.includes(city)) {
                setCity(correct); // 將 city 設為正確的城市名稱
                break;
            }
        }
    }, [city, correctCity]);

    const [getCityId, setGetCityId] = useState("");

    useEffect(() => {
        // 遍歷 user，尋找對應的 city
        for (const [cityName, [cityChineseName, cityId]] of Object.entries(user)) {
            if (city === cityChineseName) {
                setGetCityId(cityId); // 更新 getCityId 為對應的數字代碼
                break; // 找到後跳出迴圈
            }
        }
    }, [city, user]); // 依據 city 和 user 的變化執行

    useEffect(() => {
        console.log(getCityId);
    }, [getCityId]);
    console.log(getCityId);

    const [getSite, setGetSite] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (!getCityId) {
                console.log("getCityId 為空，無法查詢區");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/city/getSite?cityId=${getCityId}`);
                setGetSite(response.data);
                console.log("區:", response.data);
            } catch (error) {
                console.error("查詢失敗:", error);
            }
        };
        fetchData();

    }, [getCityId]);


    useEffect(() => {
        console.log(getSite);
    }, [getSite]);

    const [site, setSite] = useState(get_address.區);
    const [selectedSiteId, setSelectedSiteId] = useState(null);
    useEffect(() => {
        // 遍歷站點列表，找到 siteName 與 site 相符的項目
        const matchingSite = getSite.find((s) => s.siteName === site);

        if (matchingSite) {
            setSelectedSiteId(matchingSite.siteId); // 儲存 siteId
        } else {
            setSelectedSiteId(null); // 如果未找到則清空
        }
    }, [getSite, site]);

    const[citySiteStore, setCitySiteStore]=useState([]);

    useEffect(() => {
        console.log(selectedSiteId);
        const fetchData = async () => {
            if (!getCityId) {
                console.log("getCityId 為空，無法查詢區");
                return;
            }
            try {
                const response = await axios.post(`http://localhost:8080/store/byCitySite`,{
                    city_id:getCityId,
                    site_id:selectedSiteId,
                });
                setCitySiteStore(response.data);
                console.log("店家列表:", response.data);
            } catch (error) {
                console.error("查詢失敗:", error);
            }
        };
        fetchData();
    }, [selectedSiteId]);

    const [getId, setGetStoreId] = useState(0); // 用 useState 管理 getId
    const [storeName, setStoreName] = useState("");
    const [jump, setJump] = useState(false);

    useEffect(() => {
        console.log("更新的 StoreId:", getId); // 應該會執行這個 log
        setGetId(getId);
        setGetStoreName(storeName);
        setJump(true);
    }, [getId]);

    console.log(getId);
    console.log(storeName);

    const navigate = useNavigate();
    useEffect(() =>{
        if(jump){
            navigate("/store-info");
        }
    },[getId])


    // 切換篩選框的顯示狀態
    const toggleFilter = () => {
        setFilterOpen(!isFilterOpen);
    };

    const [clickFillter, setClickFillter] = useState(false);
    const closeFilter = () => {
        setFilterOpen(false);
        setClickFillter(false);
        setCategory([]);
    };

    const [category, setCategory] = useState([]);

    const onclickFillter = (value) => {
        setCategory((prev) => {
            if (Array.isArray(prev)) {
                if (prev.includes(value)) {
                    return prev.filter((item) => item !== value);
                } else {
                    return [...prev, value];
                }
            } else {
                console.error("Category is not an array:", prev);
                return [];
            }
        });
    };

    useEffect(() => {
        console.log(category);
    }, [category]);


    const chooseStore =()=>{
        const filteredStores = citySiteStore.filter((store) =>
            category.includes(store.store_type)
        );

        // 更新 cityStore 為過濾後的結果
        setCitySiteStore(filteredStores);
    }

    const clearAll =() =>{
        console.log(getCityId);
        console.log(selectedSiteId);
        setCitySiteStore({});
        const fetchData = async () => {
            if (!getCityId) {
                console.log("getCityId 為空，無法查詢店家");
                return;
            }
            try {
                const response = await axios.post(`http://localhost:8080/store/byCitySite`,{
                    city_id:getCityId,
                    site_id:selectedSiteId,
                });
                setCitySiteStore(response.data);
                console.log("店家列表:", response.data);
            } catch (error) {
                console.error("查詢失敗:", error);
            }
        };
        fetchData();
    }


    console.log(get_address);

    return (
        <div className="background">
            <div className="move_text_info">
                <div>
                    <MyLocationIcon/>
                    「{full_address}」附近店家
                </div>
                <div>
                    <Button
                        variant="outlined"
                        startIcon={<DoneAllIcon/>}
                        onClick={toggleFilter} // 點擊按鈕開啟模態框
                        sx={{
                            color: "grey",
                            borderColor: "grey",
                            "&:hover": {
                                borderColor: "darkgrey",
                            },
                            marginLeft: "800px",
                            marginTop: '-50px'
                        }}
                    >
                        篩選
                    </Button>
                </div>
                {isFilterOpen && (
                    <ModalOverlay onClick={closeFilter}>
                        {/* 阻止事件冒泡，避免點擊框內部關閉模態框 */}
                        <ModalBox onClick={(e) => e.stopPropagation()}>
                            <IconButton
                                onClick={closeFilter} // 點擊叉叉按鈕關閉模態框
                                sx={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                }}
                            >
                                <HighlightOffIcon/>
                            </IconButton>
                            <div>篩選條件設定...</div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="三明治/吐司" value="三明治/吐司"
                                              onClick={(e) => onclickFillter(e.target.value)}/>三明治/吐司
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="中式" value="中式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>中式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="丼飯/蓋飯" value="丼飯/蓋飯"
                                              onClick={(e) => onclickFillter(e.target.value)}/>丼飯/蓋飯
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="便當" value="便當"
                                              onClick={(e) => onclickFillter(e.target.value)}/>便當
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="健康餐" value="健康餐"
                                              onClick={(e) => onclickFillter(e.target.value)}/>健康餐
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="台式" value="台式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>台式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="咖哩" value="咖哩"
                                              onClick={(e) => onclickFillter(e.target.value)}/>咖哩
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="咖啡" value="咖啡"
                                              onClick={(e) => onclickFillter(e.target.value)}/>咖啡
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="壽司" value="壽司"
                                              onClick={(e) => onclickFillter(e.target.value)}/>壽司
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="小吃" value="小吃"
                                              onClick={(e) => onclickFillter(e.target.value)}/>小吃
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="披薩" value="披薩"
                                              onClick={(e) => onclickFillter(e.target.value)}/>披薩
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="拉麵" value="拉麵"
                                              onClick={(e) => onclickFillter(e.target.value)}/>拉麵
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="日式" value="日式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>日式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="早餐" value="早餐"
                                              onClick={(e) => onclickFillter(e.target.value)}/>早餐
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="東南亞" value="東南亞"
                                              onClick={(e) => onclickFillter(e.target.value)}/>東南亞
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="歐美" value="歐美"
                                              onClick={(e) => onclickFillter(e.target.value)}/>歐美
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="泰式" value="泰式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>泰式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="港式" value="港式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>港式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="湯品" value="湯品"
                                              onClick={(e) => onclickFillter(e.target.value)}/>湯品
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="滷味" value="滷味"
                                              onClick={(e) => onclickFillter(e.target.value)}/>滷味
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="漢堡" value="漢堡"
                                              onClick={(e) => onclickFillter(e.target.value)}/>漢堡
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="火鍋" value="火鍋"
                                              onClick={(e) => onclickFillter(e.target.value)}/>火鍋
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="炒飯" value="炒飯"
                                              onClick={(e) => onclickFillter(e.target.value)}/>炒飯
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="炸雞" value="炸雞"
                                              onClick={(e) => onclickFillter(e.target.value)}/>炸雞
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="燒烤" value="燒烤"
                                              onClick={(e) => onclickFillter(e.target.value)}/>燒烤
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="牛排" value="牛排"
                                              onClick={(e) => onclickFillter(e.target.value)}/>牛排
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="甜甜圈" value="甜甜圈"
                                              onClick={(e) => onclickFillter(e.target.value)}/>甜甜圈
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="甜點" value="甜點"
                                              onClick={(e) => onclickFillter(e.target.value)}/>甜點
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="異國" value="異國"
                                              onClick={(e) => onclickFillter(e.target.value)}/>異國
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="粥" value="粥" onClick={(e) => onclickFillter(e.target.value)}/>粥
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="素食" value="素食"
                                              onClick={(e) => onclickFillter(e.target.value)}/>素食
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="義大利麵" value="義大利麵"
                                              onClick={(e) => onclickFillter(e.target.value)}/>義大利麵
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="蛋糕" value="蛋糕"
                                              onClick={(e) => onclickFillter(e.target.value)}/>蛋糕
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="豆花" value="豆花"
                                              onClick={(e) => onclickFillter(e.target.value)}/>豆花
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="越式" value="越式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>越式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="鐵板燒" value="鐵板燒"
                                              onClick={(e) => onclickFillter(e.target.value)}/>鐵板燒
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="韓式" value="韓式"
                                              onClick={(e) => onclickFillter(e.target.value)}/>韓式
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="飲料" value="飲料"
                                              onClick={(e) => onclickFillter(e.target.value)}/>飲料
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="餃子" value="餃子"
                                              onClick={(e) => onclickFillter(e.target.value)}/>餃子
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="鹹酥雞/雞排" value="鹹酥雞/雞排"
                                              onClick={(e) => onclickFillter(e.target.value)}/>鹹酥雞/雞排
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Checkbox label="麵食" value="麵食"
                                              onClick={(e) => onclickFillter(e.target.value)}/>麵食
                                </Grid>
                            </Grid>
                            <div style={{
                                marginLeft: "280px",
                            }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: "black",
                                        color: "black",
                                    }}
                                    onClick={clearAll}
                                >
                                    清除所有
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#e04c7f",
                                        marginLeft: '10px',
                                    }}
                                    onClick={chooseStore}
                                >
                                    使用
                                </Button>
                            </div>

                        </ModalBox>
                    </ModalOverlay>
                )}
                <div className="move_store_text">
                    <Components cityStore={citySiteStore} setGetStoreId={setGetStoreId} setStoreName={setStoreName}/>
                </div>
            </div>
        </div>
    );
};

export default CitySiteStore;
