import React from "react";
import { Menu } from "antd";
import {
       DesktopOutlined,
       FileOutlined,
       PieChartOutlined,
       TeamOutlined,
       UserOutlined,
      } from '@ant-design/icons';
const manuList = () =>{
    return(
        <Menu>
            <Menu.Item key="home" icon= {<DesktopOutlined/>}
            >
            DASHBOARD
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            ITEMS
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            PROMOTION
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            ADD USER
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            STOCK
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            BANKS
            </Menu.Item>
            <Menu.Item key="home" icon= {<FileOutlined/>}
            >
            DISCOUNT
            </Menu.Item>
            
        </Menu>
        
    );
}
export default manuList