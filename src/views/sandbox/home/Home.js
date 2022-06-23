import React, { useEffect, useState,useRef } from 'react'
import { Card, Col, Row, List, Typography, Avatar,Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as Echarts from 'echarts'
import _ from "lodash";
import axios from 'axios';
const { Meta } = Card;


export default function Home() {
    const [viewList, setViewList] = useState([])
    const [starList, setStarList] = useState([])
    const [allList,setAllList] = useState([])
    const [visible, setVisible] = useState(false);
    const [pieChart,setPieChart] = useState(null)
    const barRef = useRef()
    const pieRef = useRef()

    const { username, region, role: {roleName } } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios(`/news?publishState=1&_expand=category&_sort=view&_order=desc&_limit=6`).then((res) => {
            setViewList(res.data)
        })
    }, [])

    useEffect(() => {
        axios(`news?publishState=1&_expand=category&_sort=start`).then((res) => {
            setStarList(res.data)

        })
    }, [])

    useEffect(() => {
        axios(`news?publishState=2&_expand=category`).then((res) => {
            renderBarView(_.groupBy(res.data, item => item.category.title))
            setAllList(res.data)
        })
        return () => {
            window.onresize = null
        }
    }, [])


    const renderBarView=(obj)=>{
        var myChart = Echarts.init(barRef.current);

        // 指定图表的配置项和数据
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['数量']
            },
            xAxis: {
                data: Object.keys(obj)
            },
            yAxis: {
                minInterval: 1
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: Object.values(obj).map(item=>item.length)
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = () => {
            myChart.resize()
        }
    }

    const renderPieView = (obj) => {
        //数据处理工作
        var currentList = allList.filter((item) => item.author === username)
        var groupObj = _.groupBy(currentList,item=>item.category.title)
        // console.log(groupObj)

        var list = []
        for (var i in groupObj) {
            list.push({
                name: i,
                value:groupObj[i].length
            })
        }

        var myChart;
        if (!pieChart) {
            myChart = Echarts.init(pieRef.current)
            setPieChart(myChart)
        } else {
            myChart = pieChart
        }
        const option = {
            title: {
                text: '当前用户新闻分类图示',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        myChart.setOption(option);
    }

    const showDrawer = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(true);
            renderPieView()
        },0)

    };

    const onClose = () => {
      setVisible(false);
    };

    // const ajaxMethod = () => {
    //     // axios.get('http://localhost:8000/posts').then((res) => {
    //     //     console.log('查看json-server接口返回数据', res)
    //     // })
    //     //增加
    //     // axios.post('http://localhost:8000/posts', {
    //     //     title: '4444',
    //     //     author:'xiaoma'
    //     // })
    //     //修改 put
    //     // axios.put('http://localhost:8000/posts/2', {
    //     //     title:'1111-修改'
    //     // })
    //     //更新patch
    //     // axios.patch('http://localhost:8000/posts/2', {
    //     //     title:'111111-修改-111111'
    //     // })
    //     //删除delete

    //     //高级功能
    //     //_embed
    //     // axios.get('http://localhost:8000/posts?_embed=comments').then((res) => {
    //     //     console.log('res',res)
    //     // })
    //     //_expand
    //     // axios.get('http://localhost:8000/comments?_expand=post').then((res) => {
    //     //     console.log('res',res)
    //     // })
    // }
  return (
    <div className="site-card-wrapper">
        <Row gutter={16}>
        <Col span={8}>
            <Card title="用户最常浏览" bordered={true}>
                <List
                    dataSource={viewList}
                    renderItem={(item) => (
                        <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item.title}
                        </List.Item>
                    )}
                />
            </Card>
        </Col>
        <Col span={8}>
            <Card title="用户点赞最多" bordered={true}>
                <List
                        dataSource={starList}
                        renderItem={(item) => (
                            <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item.title}
                            </List.Item>
                        )}
                    />
            </Card>
        </Col>
        <Col span={8}>
            <Card
                style={{
                width: 300,
                }}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={[
                <SettingOutlined key="setting" onClick={showDrawer}/>,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={username}
                    description={
                        <div>
                            <b>{region ? region : '全球'}</b>
                            <span style={{paddingLeft:'30px'}}>{ roleName}</span>
                        </div>
                    }
                />
            </Card>
        </Col>
          </Row>
          <div ref={barRef} style={
              {
                width:'100%',
                height:'400px',
                marginTop:'30px'
              }
          }>
          </div>

        <Drawer width='500px' title="个人新闻分类" placement="right" onClose={onClose} visible={visible}>
            <div ref={pieRef} style={
                {
                    width:'100%',
                    height:'400px',
                    marginTop:'30px'
                }
            }>
            </div>
        </Drawer>
  </div>
  )
}
