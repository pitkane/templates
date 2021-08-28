import { Form, Button, Col, Input, Row } from 'antd'
import { Formik } from 'formik'

import { useAppDispatch } from '../../redux'
import { login, logout } from './authSlice'

interface LoginProps {
  isAuthenticated: boolean
}

export const Login = ({ isAuthenticated }: LoginProps) => {
  const dispatch = useAppDispatch()

  const oncClickLogoutButton = () => {
    dispatch(logout())
  }

  return (
    <Row justify="center">
      {!isAuthenticated && (
        <Col span={4}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(login(values.email, values.password))
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2))
              //   setSubmitting(false)
              // }, 400)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <div>
                <Form onFinish={handleSubmit} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                  <Form.Item label="Username" style={{ marginBottom: 5 }}>
                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                    {errors.email && touched.email && errors.email}
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Formik>
        </Col>
      )}

      {isAuthenticated && (
        <Col>
          <Button onClick={() => oncClickLogoutButton()}>Logout</Button>
        </Col>
      )}
    </Row>
  )
}
