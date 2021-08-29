import { Space, DatePicker, Typography } from 'antd'

import moment from 'moment'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { fetchExampleData } from './exampleSlice'

const { Text, Link } = Typography

export const Example = () => {
  const onDateChange = (date: moment.Moment | null, dateString: string) => {
    console.log(date, dateString)
  }

  const dispatch = useAppDispatch()
  const exampleDataStatus = useAppSelector((state) => state.example.status)

  useEffect(() => {
    if (exampleDataStatus === 'idle') {
      dispatch(fetchExampleData())
    }
  }, [exampleDataStatus, dispatch])

  return (
    <Space direction="vertical" size={12}>
      <DatePicker onChange={onDateChange} />

      <Text>Ant Design (default)</Text>
      <Text type="secondary">Ant Design (secondary)</Text>
      <Text type="success">Ant Design (success)</Text>
      <Text type="warning">Ant Design (warning)</Text>
      <Text type="danger">Ant Design (danger)</Text>
      <Text disabled>Ant Design (disabled)</Text>
      <Text mark>Ant Design (mark)</Text>
      <Text code>Ant Design (code)</Text>
      <Text keyboard>Ant Design (keyboard)</Text>
      <Text underline>Ant Design (underline)</Text>
      <Text delete>Ant Design (delete)</Text>
      <Text strong>Ant Design (strong)</Text>
      <Text italic>Ant Design (italic)</Text>
      <Link href="https://ant.design" target="_blank">
        Ant Design (Link)
      </Link>
    </Space>
  )
}
