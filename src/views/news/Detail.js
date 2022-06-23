
import React, { useEffect,useState} from 'react'
import { Descriptions, PageHeader } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import moment from 'moment'
import axios from 'axios';



export default function Detail(props) {
    const [newsInfo, setNewsInfo] = useState(null)
    useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then((res) => {
            setNewsInfo({
                ...res.data,
                view:res.data.view +1
            })
            return res.data
            //同步后端
        }).then((res) => {
            axios.patch(`/news/${props.match.params.id}`, {
                view:res.view+1
            })
        })
    }, [props.match.params.id])
    const handleStar = () => {
        setNewsInfo({
            ...newsInfo,
            star:newsInfo.star+1
        })
        axios.patch(`/news/${props.match.params.id}`, {
            star:newsInfo.star+1
        })
    }

  return (
      <div>
          {
              newsInfo && <div>
                  <PageHeader
                      ghost={false}
                      onBack={() => window.history.back()}
                      title={newsInfo.title}
                      subTitle={
                          <div>
                              <span> newsInfo.category.title</span>
                              <HeartTwoTone twoToneColor="#eb2f96" onClick={handleStar }/>
                          </div>

                      }
                    >
                        <Descriptions size="small" >
                            <Descriptions.Item label="创建者">{newsInfo.author }</Descriptions.Item>
                          <Descriptions.Item label="发布时间">{newsInfo.publishTime?moment(newsInfo.publishTime).format('YYYY/MM/DD HH-mm-ss'):'-' }</Descriptions.Item>
                          <Descriptions.Item label="区域">{ newsInfo.region}</Descriptions.Item>
                          <Descriptions.Item label="访问数量">{newsInfo.view }</Descriptions.Item>
                          <Descriptions.Item label="点赞数量">{newsInfo.star }</Descriptions.Item>
                          <Descriptions.Item label="评论数量">0</Descriptions.Item>
                        </Descriptions>
                  </PageHeader>
                  <div dangerouslySetInnerHTML={{
                      __html: newsInfo.content
                  }} style={{
                      border: '1px solid black',
                      margin:'0 24px'
                  }}>
                  </div>
              </div>
        }
    </div>
  )
}
