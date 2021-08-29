import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Layout } from 'antd'
import _ from 'lodash'

import { Login } from '../Auth/Login'
import { useAppDispatch, useAppSelector } from '../../redux'
import { authSlice, selectUser } from '../Auth/authSlice'
import { ProtectedRoute } from '../../utils/auth'
import Header from '../../components/Header'
import { Example } from '../Example/Example'
import { firebaseApp } from '../../utils/firebase'
import { Home } from '../Home/Home'

const { Content } = Layout

const StyledContent = styled(Content)`
  min-height: 680px;
  background: #fff;
  padding: 24px;
  margin: 0px 24px 24px 24px;
`

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  const user = useAppSelector(selectUser)
  const isAuthenticated = !_.isEmpty(user?.email)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, (user: any) => {
      if (user?.email) {
        dispatch(authSlice.actions.setUser({ email: user.email }))
        if (isLoading) {
          setIsLoading(false)
        } else {
          history.push('/home')
        }
      } else {
        setIsLoading(false)
        history.push('/login')
      }
    })
  }, [isLoading])

  if (isLoading) return <div />

  return (
    <Layout>
      {isAuthenticated && <Header />}

      <StyledContent>
        <Switch>
          <Route path="/login" exact>
            <Login isAuthenticated={isAuthenticated} />
          </Route>

          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>

          <ProtectedRoute exact path="/example">
            <Example />
          </ProtectedRoute>

          <Route path="*">
            <Redirect to={isAuthenticated ? '/' : '/login'} />
          </Route>
        </Switch>
      </StyledContent>
    </Layout>
  )
}

export default App
