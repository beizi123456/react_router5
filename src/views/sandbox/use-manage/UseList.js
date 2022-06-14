import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button, Modal,Switch} from 'antd'
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function RightList() {
    const [tableList, setTableList] = useState([])
    // const [isShow,setIsShow] = useState(false)
    useEffect(() => {
        axios('http://localhost:9000/users?_expand=role').then((res) => {
            const list = res.data
            setTableList(list)
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) =>{
                return <b>{ region===""?"全球":region }</b>
            }
        },
        {
          title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={ item.default}></Switch>
            }
          },
          {
              title: '操作',
              key: 'action',
              render: (item) => {
                  return (
                      <div>
                          <Button shape="circle" icon={<DeleteOutlined />} danger disabled={ item.default} onClick={() => showConfirm(item)}/>
                          <Button style={{ marginLeft: '10px' }} type="primary" shape="circle" disabled={ item.default} icon={<EditOutlined />}/>
                      </div>
                  )
              }
          },
      ];

    //删除
    const deleteMethod = (item) => {
        //当前页面同步状态+ 后端同步


    }
    const showConfirm = (item) => {
        confirm({
          title: '删除',
          icon: <ExclamationCircleOutlined />,
          content: '是否确定删除？',
          onOk() {
            deleteMethod(item)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    };

  return (
      <div>
          <Table dataSource={tableList} hideSelectAll={false} columns={columns} pagination={{
              pageSize: 5
          }}
              rowKey={
                  item=>item.id
              }
          />
      </div>
  )
}
