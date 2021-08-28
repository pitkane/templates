import { Space, DatePicker, Typography } from 'antd'

import moment from 'moment'

const { Text, Link } = Typography
// const { RangePicker } = DatePicker

export const Test = () => {
  function onChange(date: moment.Moment | null, dateString: string) {
    console.log(date, dateString)
  }

  return (
    <Space direction="vertical" size={12}>
      <DatePicker onChange={onChange} />

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
