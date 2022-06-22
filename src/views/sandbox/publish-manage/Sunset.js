
import React from 'react'

import { Button } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

export default function Sunset() {
   const {tableList,handleDelete} = usePublish(3)

  return (
      <div>
          <NewsPublish
              dataSource={tableList}
              button={(id)=><Button danger onClick={ ()=>handleDelete(id)}>删除</Button>}
          ></NewsPublish>
    </div>
  )
}
