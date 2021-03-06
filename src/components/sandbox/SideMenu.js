import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import { Layout, Menu} from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';




import './index.css'
const { Sider } = Layout

const iconList = {
    "/home": <LaptopOutlined />,
    "/user-manage": <NotificationOutlined />,
    "/right-manage":<UserOutlined />
}



function SideMenu(props) {
    const [menuList, setMenuList] = useState([])
    const { role: { rights} } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/rights?_embed=children').then((res) => {
            let list = res.data
            menuTree(list)
            setMenuList([...list])
        })
        // eslint-disable-next-line
    }, [])
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
    const selectKeys = [props.location.pathname]
    const openKeys = ['/'+ props.location.pathname.split('/')[1]]
    return (
        <Sider trigger={null} collapsible collapsed={ props.isCollapsed}>
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

const mapStateToProps = ({CollapsedReducer: {isCollapsed } }) => ({
    isCollapsed
})

export default connect(mapStateToProps)(withRouter(SideMenu))
