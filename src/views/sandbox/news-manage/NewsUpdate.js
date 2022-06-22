import React, { useEffect, useState, useRef } from 'react'
import style from './News.module.css'
import { PageHeader, Steps, Button, Form, Input, Select, message ,notification} from 'antd';
import NewsEditor from '../../../components/news-manage/NewsEditor';
import axios from 'axios';
const { Step } = Steps;
const { Option } = Select





export default function NewsAdd(props) {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0)
    const [categoryList,setCategoryList] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content,setContent] = useState('')


    const [formLayout] = useState('horizontal');
    const NewsForm = useRef(null)

    // const User = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get('/categories').then((res) => {
            setCategoryList(res.data)
        })
     },[])

     useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then((res) => {
            let { title, categoryId ,content} = res.data
            NewsForm.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content)
        })
     },[props.match.params.id])
    const handleNext = () => {
        if (current === 0) {
            NewsForm.current.validateFields().then(res => {
                setFormInfo(res)
                setCurrent(current+1)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            if (content === '' || content.trim() === '<p></p>') {
                message.error('新闻内容不能为空')
            } else {
                setCurrent(current + 1)
            }
        }

    }
    const handlePrevious = () => {
        setCurrent(current-1)
    }
    const handleSave = (auditState) => {
        debugger;
        axios.patch(`/news/${props.match.params.id}`, {
            ...formInfo,
            content: content,
            auditState: auditState,
        }).then(() => {
            props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
            notification.open({
                message: '通知',
                description: `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
                placement:'bottomRight',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });

        })
    }


    const formItemLayout =
        formLayout === 'horizontal'
        ? {
            labelCol: {
                span: 3,
            },
            wrapperCol: {
                span: 18,
            },
            }
        : null;
  return (
        <div>
            <PageHeader
              className="site-page-header"
              title="更新新闻"
              subTitle="This is a subtitle"
              onBack={() => props.history.goBack() }
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容"  description="新闻主题内容" />
                <Step title="新闻提交" description="保存草稿或提交审核" />
          </Steps>
          <div>
              <div style={{ marginTop: '50px' }}>
                  <div className={current === 0 ? '' : style.active}>
                    <Form
                            {...formItemLayout}
                            layout={formLayout}
                            form={form}
                            style={{ marginTop: '20px' }}
                            ref={NewsForm }

                        >
                                <Form.Item label="新闻标题" name='title' rules={[{ required: true }]}>
                                    <Input placeholder="新闻标题" />
                                </Form.Item>
                                <Form.Item label="新闻分类" name='categoryId' rules={[{ required: true }]}>
                                <Select>
                                    {
                                        categoryList.map(
                                            item => <Option value={item.id} key={ item.id }>{ item.title}</Option>
                                            )
                                    }
                                    </Select>
                                </Form.Item>
                        </Form>
                  </div>
                  <div className={current === 1 ? '' : style.active}>
                      <NewsEditor getContent={(value) => {
                          setContent(value)
                      }} content={content}/>
                  </div>
                  <div className={current === 2 ? '' : style.active}>
                    33333
                  </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    {
                        current === 2 &&
                        <span>
                              <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                              <Button onClick={() => handleSave(1)}>提交审核</Button>
                        </span>

                    }
                    {
                        current<2 && <Button type="primary" onClick={handleNext}>下一步</Button>
                    }
                    {
                        current > 0 &&  <Button onClick={handlePrevious}>上一步</Button>
                    }
                </div>
          </div>
        </div>
  )
}
