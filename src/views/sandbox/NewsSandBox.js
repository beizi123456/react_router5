import React, { useEffect} from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import axios from 'axios'

import { Layout } from 'antd'
import  './NewsSandBox.modules.css'

import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
// import Home
import Home from './home/Home'
import UseList from './use-manage/UseList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'

const { Content } = Layout;

export default function NewsSandBox() {
    useEffect(()=>{
        axios({
            method:'POST',
            url: 'http://124.220.16.84/api/user/login',
            data: {
                password: "f399a4910e1019e4e127a26da938d8e6",
                username: "admin"
              },

        })
    },[])
  return (
      <Layout>
          <SideMenu></SideMenu>
          <Layout className="site-layout">
            <TopHeader></TopHeader>
              { /*内容组件*/}
              <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/use-manage/list' component={UseList} />
                        <Route path='/right-manage/role/list' component={RoleList} />
                        <Route path='/right-manage/right/list' component={RightList} />
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path='*' component={NoPermission}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
  )
}
