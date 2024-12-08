import React, {useState,useEffect} from "react";
import "../App.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import {useNavigate } from "react-router-dom";//轉跳頁面


function Components ({cityStore, setGetStoreId,setStoreName})  {
    //console.log(cityStore);
    const navigate = useNavigate();
    const storeArray = Array.isArray(cityStore) ? cityStore : Object.values(cityStore);
    console.log(storeArray);
    const showStoreInfo = (storeId, storeName) => {
        console.log("即將設置的 StoreId:", storeId); // 檢查 storeId 的值
        setGetStoreId(storeId);
        setStoreName(storeName);
    };

    return (
        <>
            <Grid container spacing={3}>
                {storeArray.map((store, index) => (
                    <Grid item xs={12} sm={6} md={4} key={store.storeId || index}>
                        <Card sx={{ maxWidth: 345 }} onClick={() => showStoreInfo(store.storeId, store.store_name)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={store.image || "/static/images/no-image.png"}
                                    alt={store.image|| "image not available"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {store.store_name || "No Name"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {store.store_type || "No description available"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {store.store_address || "No description available"}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
};

export default Components;
