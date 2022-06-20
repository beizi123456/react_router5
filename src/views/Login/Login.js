import React from 'react'
import axios from 'axios'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
// import { tsParticles } from "tsparticles-engine";

import './Login.css'


 export default function Login(props) {

    // useEffect(()=>{
    //     // axios({
    //     //     method:'POST',
    //     //     url: 'http://124.220.16.84/api/user/login',
    //     //     data: {
    //     //         password: "f399a4910e1019e4e127a26da938d8e6",
    //     //         username: "admin"
    //     //       },
    //     // }).then((res) => {
    //     //     console.log('res',res)
    //     // })
    // }, [])
    const onFinish = (values) => {
        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
            console.log('-------', res.data)
            if (res.data.length === 0) {
                message.error('用户名或密码不匹配')

            } else {
                localStorage.setItem('token',JSON.stringify(res.data[0]))
                props.history.push('/')
            }
        })

      };
  return (
      <div  style={{ background: 'rgb(35,39,65)', height: '100%' }}>
          <div className='formContainer'>
            <div className='loginTittle'>全球新闻发布管理系统</div>
            <Form
                name="normal_login"
                className="login-form"
                // initialValues={{ remember: true }}
                onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/">
                Forgot password
                </a>
            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                登录
                </Button>
                {/* Or <a href="/">register now!</a> */}
            </Form.Item>
                </Form>
          </div>
    </div>
  )
}



