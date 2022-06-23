import React  from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Dropdown, Menu ,Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux'

const { Header } = Layout;


function TopHeader(props) {
    console.log(props)
    // const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        //改变state的isCollapsed的状态
        props.changeCollapsed()
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
               props.isCollapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:<MenuFoldOutlined onClick={changeCollapsed}/>
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

 /**
  * connect(
  *  //mapStateToProps
  * //mapDispatchToProps
  * )(被包装的组件)
  *
 */

const mapStateToProps = ({ CollapsedReducer: {isCollapsed }}) => {
    return {
        isCollapsed
    }
}

const maoDispatchToProps = {
    changeCollapsed() {
        return {
            type: 'change_collapsed',
            //payload:

        }

    }

}

export default connect(mapStateToProps,maoDispatchToProps)(withRouter(TopHeader))
