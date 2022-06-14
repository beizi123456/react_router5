import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button, Modal,Switch,Form, Input, Radio,Select} from 'antd'
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
const { confirm } = Modal;
const { Option } = Select




export default function UseList() {
    const [tableList, setTableList] = useState([])
    const [visible, setVisible] = useState(false);
    const [roleList, setRoleLIst] = useState([]);
    const [regionList,setRegionList] = useState([])

    useEffect(() => {
        axios('http://localhost:9000/users?_expand=role').then((res) => {
            const list = res.data
            setTableList(list)
        })
    }, [])

    useEffect(() => {
        axios('http://localhost:9000/regions').then((res) => {
            const list = res.data
            console.log('regionList',list)
            setRegionList(list)
        })
    }, [])

    useEffect(() => {
        axios('http://localhost:9000/roles').then((res) => {
            const list = res.data
            console.log('rolesList',list)
            setRoleLIst(list)
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

    const onCreate = (values) => {
        setVisible(false);
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
          <CollectionCreateForm
                regionList={regionList}
                roleList={ roleList}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
      </div>
  )
}


const CollectionCreateForm = ({ roleList,regionList,visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="添加用户"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
        //   form={form}
          layout="vertical"
        //   name="form_in_modal"
        //   initialValues={{
        //     modifier: 'public',
        //   }}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                {
                    required: true,
                    message: '请输入用户名',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
            >
            <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
            >
                <Select
                    defaultValue="lucy"
                    // onChange={handleChange}
                    >
                        {
                            regionList.map((item) =>
                                <Option value={item.value} key={ item.id}>{ item.title}</Option>
                            )
                        }

                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
            >
                <Select
                    defaultValue="lucy"
                    // onChange={handleChange}
                    >
                        {
                            roleList.map((item) =>
                                <Option value={item.roleType} key={ item.id}>{ item.roleName}</Option>
                            )
                        }

                </Select>
            </Form.Item>
            <Form.Item name="modifier" className="collection-create-form_last-form-item">
                <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
      </Modal>
    );
  };
