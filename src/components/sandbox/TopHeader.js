import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Dropdown, Menu ,Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';

const { Header } = Layout;


 function TopHeader(props) {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

     const { role:{roleName},username} = JSON.parse(localStorage.getItem('token'))

    const menu = (
        <Menu>
            <Menu.Item>{ roleName }</Menu.Item>
            <Menu.Item danger onClick={() => {
                localStorage.removeItem('token')
                props.history.replace('/login')
            }}>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px'}}>
            {
               collapsed?<MenuUnfoldOutlined onCldick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
            }
            <div style={{ float:'right'}}>
                <span>欢迎<span style={{color:'#1890ff'}}>{username}</span>回来</span>
                <Dropdown overlay={menu}>
                   <Avatar size='large' icon={<UserOutlined/>}></Avatar>
                </Dropdown>
            </div>

        </Header>
    )
}

export default withRouter(TopHeader)
