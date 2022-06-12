import React from 'react'
import { withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
    AppstoreOutlined, MailOutlined, SettingOutlined
  } from '@ant-design/icons';


import './index.css'
const { Sider } = Layout
// const { SubMenu } = Menu

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

const items = [
    getItem('首页', '/home', <MailOutlined />),
    getItem('用户管理', 'sub3', <AppstoreOutlined />, [
      getItem('用户列表', '/use-manage/list'),
    ]),
    getItem('权限管理', 'sub4', <SettingOutlined />, [
      getItem('角色列表', '/right-manage/role/list'),
      getItem('权限列表', '/right-manage/right/list'),
    ]),
  ];

function SideMenu(props) {
    return (
        <Sider trigger={null} collapsible>
            <div className="logo">
                全球新闻发布管理系统
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                // inlineCollapsed={true}
                items={items}
                onClick={
                    (itemInfo) => {
                        props.history.replace(itemInfo.key)
                    }
                }
            />
      </Sider>
  )
}

export default withRouter(SideMenu)
