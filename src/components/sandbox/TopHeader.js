import React, { useState } from 'react'
import { Layout, Dropdown, Menu ,Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';

const { Header } = Layout;





const menu = (
    <Menu>
        <Menu.Item>超级管理员</Menu.Item>
        <Menu.Item danger>退出</Menu.Item>
    </Menu>
);



export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px'}}>
            {
               collapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{ float:'right'}}>
                <span>欢迎admin回来</span>
                <Dropdown overlay={menu}>
                   <Avatar size='large' icon={<UserOutlined/>}></Avatar>
                </Dropdown>
            </div>

        </Header>
    )
}
