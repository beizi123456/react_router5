import React, { useEffect} from 'react'



import './NewsSandBox.css'

import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NProgress from 'nprogress'
import  'nprogress/nprogress.css'

import { Layout } from 'antd'
import NewsRouter from '../../components/sandbox/NewsRouter';
const { Content } = Layout;


export default function NewsSandBox() {
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })
    return (
      <Layout>
          <SideMenu></SideMenu>
          <Layout className="site-layout">
            <TopHeader></TopHeader>
              { /*内容组件*/}
              <Content
                    className='site-layout-background'
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: '100vh',
                  }}>
                  <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
  )
}
