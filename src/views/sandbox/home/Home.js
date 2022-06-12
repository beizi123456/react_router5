import React from 'react'
import { Button } from 'antd';
// import axios from 'axios'

export default function home() {
    const ajaxMethod = () => {
        // axios.get('http://localhost:8000/posts').then((res) => {
        //     console.log('查看json-server接口返回数据', res)
        // })
        //增加
        // axios.post('http://localhost:8000/posts', {
        //     title: '4444',
        //     author:'xiaoma'
        // })
        //修改 put
        // axios.put('http://localhost:8000/posts/2', {
        //     title:'1111-修改'
        // })
        //更新patch
        // axios.patch('http://localhost:8000/posts/2', {
        //     title:'111111-修改-111111'
        // })
        //删除delete

        //高级功能
        //_embed
        // axios.get('http://localhost:8000/posts?_embed=comments').then((res) => {
        //     console.log('res',res)
        // })
        //_expand
        // axios.get('http://localhost:8000/comments?_expand=post').then((res) => {
        //     console.log('res',res)
        // })

    }
  return (
      <div>
          <Button type="primary" onClick={ajaxMethod}>Primary Button</Button>
    </div>
  )
}
