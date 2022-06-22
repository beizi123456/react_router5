import React from 'react'
import axios from 'axios'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import style from './Login.module.css'


 export default function Login(props) {

    const onFinish = (values) => {
        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
            if (res.data.length === 0) {
                message.error('用户名或密码不匹配')

            } else {
                localStorage.setItem('token',JSON.stringify(res.data[0]))
                props.history.push('/')
            }
        })
      };
  return (
      <div  style={{ backgroundColor: 'rgb(35,39,65)', height: '100%' }}>
          <div className={ style.formContainer }>
              <div className={ style.loginTittle }>全球新闻发布管理系统</div>
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



