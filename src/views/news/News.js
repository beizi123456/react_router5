import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import _ from 'lodash'

export default function News() {
    const [list,setList] = useState([])
    useEffect(() => {
        axios(`/news?publishState=2&_expand=category`).then((res) => {
            setList(Object.entries(_.groupBy(res.data,item=>item.category.title)))
        })
    },[])
  return (
      <div style={{width:'95%',margin:'0 auto'}}>
            <PageHeader
                className="site-page-header"
                title="全球大新闻"
                subTitle="查看新闻"
          />
            <div className="site-card-wrapper">
              <Row gutter={[16, 16]}>
                  {
                      list.map((item) =>
                          <Col span={8} key={ item[0] }>
                              <Card title={ item[0]} bordered={true} hoverable={true}>
                                <List
                                size="large"
                                bordered
                                pagination={{
                                    pageSize:3
                                }}
                                dataSource={item[1]}
                                      renderItem={(data) => <List.Item><a href={ `#/detail/${data.id}`}>{data.title}</a></List.Item>}
                                />
                            </Card>
                        </Col>
                      )
                  }

                </Row>
            </div>
            {/* <div className="site-card-wrapper">
              <Row gutter={[16,16]}>
                    <Col span={8}>
                        <Card title="Card title" bordered={true} hoverable={true}>
                            <List
                                size="large"
                                bordered
                                pagination={{
                                    pageSize:3
                                }}
                                dataSource={data}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={true} hoverable={true}>
                            <List
                                size="large"
                                bordered
                                pagination={{
                                    pageSize:3
                                }}
                                dataSource={data}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={true} hoverable={true}>
                            <List
                                size="large"
                                bordered
                                pagination={{
                                    pageSize:3
                                }}
                                dataSource={data}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                </Row>
            </div> */}
        </div>
  )
}
