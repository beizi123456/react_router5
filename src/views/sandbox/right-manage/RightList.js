import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Tag, Button, Modal,Popover,Switch} from 'antd'
import {
    DeleteOutlined,
    SearchOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function RightList() {
    const [tableList, setTableList] = useState([])
    // const [isShow,setIsShow] = useState(false)
    useEffect(() => {
        axios('/rights?_embed=children').then((res) => {
            const list = res.data
            list.forEach((item) => {
                if (item.children.length <= 0) {
                    item.children = ''
                }
            })
            setTableList(list)
        })
    }, [])

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',

        },
        {
          title: '权限名称',
          dataIndex: 'title',

        },
        {
          title: '权限路径',
        dataIndex: 'key',
            render: (item) => {
                return (
                    <Tag color='orange'>
                        {item.toUpperCase()}
                  </Tag>
                )
            }
          },
          {
              title: '操作',
              key: 'action',
              render: (item) => {
                  return (
                      <div>
                          <Button shape="circle" icon={<DeleteOutlined />} danger onClick={() => showConfirm(item)} />
                          <Popover
                              title="Are you sure to disabled module?"
                              trigger={item.pagepermisson === undefined?'':"click"}
                              content={
                                  <div style={{textAlign:'center'}}>
                                      <Switch defaultChecked checked={item.pagepermisson} onChange={() => switchMethod(item)} />
                                </div>
                              }
                          >
                              <Button style={{ marginLeft: '10px' }} type="primary" shape="circle" disabled={ item.pagepermisson === undefined} icon={<SearchOutlined />}/>
                        </Popover>
                      </div>
                  )
              }
          },
      ];

    //删除
    const deleteMethod = (item) => {
        //当前页面同步状态+ 后端同步
        if (item.grade === 1) {
            setTableList(tableList.filter((data) => data.id !== item.id))
            axios.delete(`/rights/${item.id}`)
        } else {
            let list =tableList.filter((data) => data.id === item.rightId)
            list[0].children = list[0].children.filter((data) => data.id !== item.id)
            setTableList([...tableList])
            axios.delete(`/children/${item.id}`)
        }

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
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1?0:1
        setTableList([...tableList])
        if (item.grade === 1) {
            axios.patch(`/rights/${item.id}`, {
                pagepermisson:item.pagepermisson
            })
        } else {
            axios.patch(`/children/${item.id}`, {
                pagepermisson:item.pagepermisson
            })

        }
        console.log('checkedMethod',item)

    }

  return (
      <div>
          <Table dataSource={tableList} hideSelectAll={false} columns={columns} rowKey={ item=>item.id }/>
      </div>
  )
}
