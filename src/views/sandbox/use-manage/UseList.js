import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';

import UserForm from '../../../components/user-manage/UserForm';

import { Table, Button, Modal,Switch} from 'antd'
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function UseList() {
    const [tableList, setTableList] = useState([])
    const [visible, setVisible] = useState(false);
    const [isUpdateVisible,setIsUpdateVisible] = useState(false)
    const [roleList, setRoleList] = useState([]);
    const [regionList, setRegionList] = useState([])
    const [isUpdateDisabled,setIsUpdateDisabled] = useState(false)
    const [userInfo,setUserInfo] = useState(null)

    const addForm = useRef(null)
    const updateForm = useRef(null)

    const {roleId,region,username } = JSON.parse(localStorage.getItem('token'))



    useEffect(() => {
        const roleObj = {
            '1': 'superadmin',
            '2': 'admin',
            '3': 'editor'
        }
        axios('/users?_expand=role').then((res) => {
            const list = res.data
            setTableList(
                roleObj[roleId] === 'superadmin' ? list : [
                    ...list.filter(item => item.username === username),
                    ...list.filter(item=>item.region === region && roleObj[item.roleId] ==='editor' )
                ]
            )

        })
    }, [roleId,region,username])

    useEffect(() => {
        axios('/regions').then((res) => {
            const list = res.data
            setRegionList(list)
        })
    }, [])

    useEffect(() => {
        axios('/roles').then((res) => {
            const list = res.data
            setRoleList(list)
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                {
                    text: '全球',
                    value:'全球'
                },
                ...regionList.map(item => ({
                    text: item.title,
                    value:item.value
                })),

            ],
            onFilter: (value, item) => {
                if (value === '全球') {
                    return item.region === ""
                } else {
                    return item.region === value
                }


            },
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
                return <Switch checked={roleState} disabled={item.default} onClick={ ()=>handleChange(item)}></Switch>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (item) => {
                return (
                    <div>
                        <Button shape="circle" icon={<DeleteOutlined />} danger disabled={ item.default} onClick={() => showConfirm(item)}/>
                        <Button style={{ marginLeft: '10px' }} type="primary" shape="circle" disabled={item.default} icon={<EditOutlined />} onClick={()=>handleUpdate(item)}/>
                    </div>
                )
            }
        },
    ];


    //删除
    const deleteMethod = (item) => {
        //当前页面同步状态+ 后端同步
        setTableList(tableList.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)
    }
    //新增
    const addFormOk = () => {
        addForm.current.validateFields().then((value) => {
            setVisible(false)
            addForm.current.resetFields()
            //post后端，生成id，再设置tableList,方便后面的删除更新
            axios.post(`/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then((res) => {
                console.log('res', res.data)
                setTableList([...tableList, {
                    ...res.data,
                    role:roleList.filter(item=>item.id === value.roleId)[0]

                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }
    //编辑
    const handleUpdate = (item) => {
        setUserInfo(item)
        setIsUpdateVisible(true)
        setTimeout(() => {
            if (item.roleId === 1) {
                setIsUpdateDisabled(true)
            } else {
                setIsUpdateDisabled(false)
            }
            updateForm.current.setFieldsValue(item)

        },0)
    }

    //提交编辑表单
    const updateFormOk = () => {
        updateForm.current.validateFields().then(value => {
            setIsUpdateVisible(false)
            setTableList(tableList.map((item) => {
                if (item.id === userInfo.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(data => data.id === value.roleId)[0]
                    }
                }
                return item
            }))
            setIsUpdateDisabled(!isUpdateDisabled)
            axios.patch(`/users/${userInfo.id}`, value)
        })

    }


    //更新状态
    const handleChange = (item) => {
        item.roleState = !item.roleState
        setTableList([...tableList])
        axios.patch(`/users/${item.id}`, {
            roleState:item.roleState
        })
    }


    //提示
    const showConfirm = (item) => {
        confirm({
          title: '删除',
          icon: <ExclamationCircleOutlined />,
          content: '是否确定删除？',
          onOk() {
            deleteMethod(item)
          },
          onCancel() {
            setIsUpdateVisible(false)
          },
        });
    };

  return (
      <div>
            <Button type='primary' onClick={() => {
                setVisible(true);
            }}>添加用户</Button>
            <Table dataSource={tableList} hideSelectAll={false} columns={columns} pagination={{
                pageSize: 5
            }}
                rowKey={
                    item=>item.id
                }
            />
        <Modal
            visible={visible}
            title="添加用户"
            okText="Create"
              cancelText="Cancel"
              onCancel={() => {
                setVisible(false)
              }}
              onOk={addFormOk}
            >
              <UserForm regionList={regionList} roleList={ roleList } ref={addForm}></UserForm>
          </Modal>
          <Modal
                visible={isUpdateVisible}
                title="更新用户"
                okText="更新"
              cancelText="取消"
              onCancel={() => {
                  setIsUpdateVisible(false)
                  setIsUpdateDisabled(!isUpdateDisabled)
              }}
              onOk={updateFormOk}
            >
              <UserForm isUpdateDisabled={isUpdateDisabled} regionList={regionList} roleList={roleList} ref={updateForm} isUpdate={ true}></UserForm>
        </Modal>
      </div>
  )
}


