import React, { useEffect, useState,useRef,useContext } from 'react'
import axios from 'axios';
import { Table, Button, Modal,Form,Input} from 'antd'
import {
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function NewsCategory() {
    const [tableList, setTableList] = useState([])
    // const [isShow,setIsShow] = useState(false)
    useEffect(() => {
        axios('/categories').then((res) => {
            setTableList(res.data)
        })
    }, [])

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',

        },
        {
           title: '栏目名称',
            dataIndex: 'title',
            editable: true,
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title:'栏目名称',
                handleSave:handleSave,
              }),

        },

          {
              title: '操作',
              render: (item) => {
                  return (
                      <div>
                          <Button shape="circle" icon={<DeleteOutlined />} danger onClick={() => showConfirm(item)} />
                      </div>
                  )
              }
          },
      ];
      const EditableContext = React.createContext(null);
      const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
          <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
              <tr {...props} />
            </EditableContext.Provider>
          </Form>
        );
      };
      const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
      }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
          if (editing) {
            inputRef.current.focus();
          }
        }, [editing]);

        const toggleEdit = () => {
          setEditing(!editing);
          form.setFieldsValue({
            [dataIndex]: record[dataIndex],
          });
        };

        const save = async () => {
          try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
          } catch (errInfo) {
            console.log('Save failed:', errInfo);
          }
        };

        let childNode = children;

        if (editable) {
          childNode = editing ? (
            <Form.Item
              style={{
                margin: 0,
              }}
              name={dataIndex}
              rules={[
                {
                  required: true,
                  message: `${title} is required.`,
                },
              ]}
            >
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
          ) : (
            <div
              className="editable-cell-value-wrap"
              style={{
                paddingRight: 24,
              }}
              onClick={toggleEdit}
            >
              {children}
            </div>
          );
        }

        return <td {...restProps}>{childNode}</td>;
      };

      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };


    const handleSave = (row) => {
        console.log('这是什么数据', row)
        setTableList(tableList.map(item => {
            if (item.id === row.id) {
                return {
                    id: item.id,
                    title: row.title,
                    value:row.title
                }
            }
            return item
        }))
        axios.patch(`/categories/${row.id}`, {
            title:row.title,
            value:row.title
        })
      };


    //删除
    const deleteMethod = (item) => {
        console.log('item',item)
        //当前页面同步状态+ 后端同步
        setTableList(tableList.filter((data) => data.id !== item.id))
        axios.delete(`/categories/${item.id}`)

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
          <Table
              components={components}
              dataSource={tableList}
              columns={columns}
              rowKey={item => item.id}
          />
      </div>
  )
}
