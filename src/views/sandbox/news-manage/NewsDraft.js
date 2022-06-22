import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button, Modal,notification} from 'antd'
import {
    DeleteOutlined,
    EditOutlined,
    UploadOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function NewsDraft(props) {
    const [tableList, setTableList] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios(`/news?author=${username}&auditState=0&_expand=category`).then((res) => {
            const list = res.data
            console.log('list',res.data)
            setTableList(list)
        })
    }, [username])

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',

        },
        {
          title: '新闻标题',
            dataIndex: 'title',
            render: (tittle,item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{ tittle}</a>
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
              key: 'action',
              render: (item) => {
                  return (
                      <div>
                          <Button shape="circle" icon={<DeleteOutlined />} danger onClick={() => showConfirm(item)} />
                          <Button style={{ marginLeft: '10px' }} shape="circle" icon={<EditOutlined />} onClick={() => {
                               props.history.push(`/news-manage/update/${item.id}`)
                          }}/>
                          <Button style={{ marginLeft: '10px' }} type="primary" shape="circle" icon={<UploadOutlined />} onClick={() =>
                              handleCheck(item.id)
                          }/>
                      </div>
                  )
              }
          },
      ];

    //删除
    const deleteMethod = (item) => {
        //当前页面同步状态+ 后端同步
        setTableList(tableList.filter((data) => data.id !== item.id))
        axios.delete(`/news/${item.id}`)

    }
    const showConfirm = (item) => {
        confirm({
          title: '删除',
          icon: <DeleteOutlined />,
          content: '是否确定删除？',
          onOk() {
            deleteMethod(item)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    };
    const handleCheck = (id) => {
        axios.patch(`/news/${id}`,{
            auditState:1
        }).then(() => {
            props.history.push('/audit-manage/list')
            notification.open({
                message: '通知',
                description: `您可以到审核列表中查看您的新闻~~~~`,
                placement:'bottomRight',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });

        })
    }

  return (
      <div>
          <Table dataSource={tableList} hideSelectAll={false} columns={columns} rowKey={ item=>item.id }/>
      </div>
  )
}

