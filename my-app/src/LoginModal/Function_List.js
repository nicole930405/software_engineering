import React, {useEffect, useState} from "react";
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";//轉跳頁面


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from 'react-router-dom';//路徑轉跳

function Function_List({ isOpen , onClose}) {

    //console.log(isOpen);

    const handleBackgroundClick = (event) => {
        //點擊背景時關閉
        if (event.target === event.currentTarget) {
            onClose(); //調用onclose函數
        }
    }

    const navigate = useNavigate();

    const handleNavigation_modify = () => {
        navigate("/modify-data");
        onClose();
    }

    const  handleNavigation_history =() => {
        navigate("/history-order");
        onClose();
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleBackgroundClick}>
            <List>
                <ListItemButton onClick={handleNavigation_history}>
                    <ListItemIcon>
                        <WorkHistoryIcon/>
                        <div className= "move_middle">
                            歷史紀錄
                        </div>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={handleNavigation_modify}>
                    <ListItemIcon>
                        <PersonOutlineOutlinedIcon/>
                        <div className= "move_middle">
                            會員資料
                        </div>
                    </ListItemIcon>
                </ListItemButton>
            </List>

        </Box>
    );


    return isOpen ?(
        <>
            <Drawer open={isOpen} onClose={handleBackgroundClick}>
                {DrawerList}
            </Drawer>
        </>
    ) : null;
}

export default Function_List;
