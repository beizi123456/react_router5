import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'


export default function Login() {

    useEffect(()=>{
        axios({
            method:'POST',
            url: 'http://124.220.16.84/api/user/login',
            data: {
                password: "f399a4910e1019e4e127a26da938d8e6",
                username: "admin"
              },
        }).then((res) => {
            console.log('res',res)
        })
    },[])
  return (
      <div>
          <input type='text'></input>
          <input type='password'></input>
          <Button type="primary">提交</Button>
    </div>
  )
}
