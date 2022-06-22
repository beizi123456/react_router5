
import { useEffect, useState } from 'react'
import axios from 'axios'
import {notification} from 'antd'


function usePublish(type) {
    const { username } = JSON.parse(localStorage.getItem('token'))
    const [tableList,setTableList] =  useState([])
    useEffect(() => {
        console.log('username')
        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then((res) => {
            setTableList(res.data)
        })
    }, [username, type])
    const handlePublished = (id) => {
        setTableList(tableList.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {
            publishState: 2,
            publishTime:Date.now
        }).then(() => {
            notification.open({
                message: '通知',
                description: `您可以到已发布中查看您的新闻`,
                placement:'bottomRight',
            });
        })
    }
    const handleSunset = (id) => {
        setTableList(tableList.filter(item => item.id !== id))
        axios.patch(`/news/${id}`, {
            publishState:3,
        }).then(() => {
            notification.open({
                message: '通知',
                description: `您可以到已下线中查看您的新闻`,
                placement:'bottomRight',
            });
        })
    }
    const handleDelete = (id) => {
        setTableList(tableList.filter(item => item.id !== id))
        axios.delete(`/news/${id}`).then(() => {
            notification.open({
                message: '通知',
                description: `您已经删除了新闻`,
                placement:'bottomRight',
            });
        })
    }
    return {
        tableList,
        handlePublished,
        handleSunset,
        handleDelete
    }
}

export default usePublish
