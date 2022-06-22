import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Button, Table,notification} from 'antd'

export default function Audit() {
    const [tableList, setTableList] = useState([])
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios(`/news?auditState=1&_expand=category`).then((res) => {
            const list = res.data
            setTableList(
                roleObj[roleId] === 'superadmin' ? list : [
                    ...list.filter(item => item.author === username),
                    ...list.filter(item=>item.region === region && roleObj[item.roleId] ==='editor' )
                ]
            )

        })
    }, [roleId, region, username])
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title,item) => {
                return <a href={ `#/news-manage/preview/${item.id}`}>{ title}</a>
            }

        },
        {
            title: '作者',
            dataIndex: 'author',

        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => {
                return category.title
            }

        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type='primary' onClick={() => handleAudit(item,2,1)}>通过</Button>
                    <Button danger onClick={() => handleAudit(item,3,0)}>驳回</Button>
                </div>
            }
        },
    ]
    const handleAudit = (item, auditState, publishState) => {
        setTableList(tableList.filter((data) =>data.id !== item.id ))
        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState
        }).then(() => {
            notification.open({
                message: '通知',
                description: `您可以到审核列表中查看您的审核状态`,
                placement:'bottomRight',
            });
        })
    }

  return (
        <div>
          <Table dataSource={tableList} hideSelectAll={false} columns={columns} rowKey={item => item.id} />
        </div>
  )
}
