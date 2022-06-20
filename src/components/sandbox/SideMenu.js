import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { Layout, Menu} from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';



import './index.css'
const { Sider } = Layout

const iconList = {
    "/home": <LaptopOutlined />,
    "/user-manage": <NotificationOutlined />,
    "/right-manage":<UserOutlined />
}
const { role: { rights} } = JSON.parse(localStorage.getItem('token'))
//遍历
function menuTree(list) {
    list.filter((item) => item.pagepermisson !== 0 && rights.includes(item.key)).forEach((item) => {
        item.icon = iconList[item.key];
        item.label = item.title;
        if (item.children && item.children.length === 0 ) {
            item.children = ''
        }
        item.children && menuTree(item.children);
    })
}



function SideMenu(props) {
    const [menuList, setMenuList] = useState([])
    useEffect(() => {
        axios.get('/rights?_embed=children').then((res) => {
            let list = res.data
            menuTree(list)

            // let listArr = JSON.parse(JSON.stringify(list))
            setMenuList([...list])
        })
    }, [])


    const selectKeys = [props.location.pathname]
    const openKeys = ['/'+ props.location.pathname.split('/')[1]]
    return (
        <Sider trigger={null} collapsible>
            <div style={{display:"flex",height:'100%','flexDirection':'column'}}>
            <div className="logo">
                管理系统
            </div>
            <div style={{flex:1,'overflow':'auto'}}>
                <Menu
                    selectedKeys={selectKeys}
                    defaultOpenKeys={openKeys}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={true}
                    items={menuList}
                    onClick={
                        (itemInfo) => {
                            console.log(itemInfo.key)
                            props.history.replace(itemInfo.key)
                        }
                    }
                />
                </div>
            </div>
      </Sider>
  )
}

export default withRouter(SideMenu)
