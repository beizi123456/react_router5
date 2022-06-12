import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { Layout, Menu } from 'antd'
import {
    MailOutlined
} from '@ant-design/icons';




import './index.css'
const { Sider } = Layout
// const { SubMenu } = Menu


//后端给的初始值
// const menuList = [
//     { key: 1, pid: 0, label: '首页' },
//     { key: 2, pid: 1, label: '管理列表' },
//     { key: 3, pid: 2, label: '管理系信息' },
//     { key: 4, pid: 2, label: '配置列表' },
//     { key: 5, pid: 1, label: '管理模块' },
//     { key: 6, pid: 0, label: '配置模块' },
//     { key: 7, pid: 0, label: '配置信息' },
// ]
// //递归遍历
// function treeData(pid, key) {
//     let parentId = 0
//     let newTreeData = []
//     menuList.map((item) => {
//         if (item[pid] === parentId && item[key]!==key) {
//             let itemObj = item

//         } else {
//             treeData()
//         }



//     })
// }


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
    };
}
function menuTree(res) {
    return res.map((item) => {
        if (item.children) {
            let info = getItem(item.title, item.key, <MailOutlined />, item.children)
            let tree = menuTree(item.children)
            console.log('tree',tree)
            return info
        }
        return getItem(item.title, item.key, <MailOutlined />)
    })
    // console.log('数组',AllArr)

}

// const items = [
//     getItem('首页', '/home', <MailOutlined />),
//     getItem('用户管理', 'sub3', <AppstoreOutlined />, [
//       getItem('用户列表', '/use-manage/list'),
//     ]),
//     getItem('权限管理', 'sub4', <SettingOutlined />, [
//       getItem('角色列表', '/right-manage/role/list'),
//       getItem('权限列表', '/right-manage/right/list'),
//     ]),
// ];


function SideMenu(props) {
    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9000/rights?_embed=children').then((res) => {
            let menu = menuTree(res.data)
            console.log('+++++++++',menu)
            setMenuList(menu)
        })
     },[])
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
                items={menuList}
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
