import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Layout } from 'antd'
import _ from 'lodash'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import { Login } from './features/Auth/Login'
import { useAppDispatch, useAppSelector } from './redux'
import { authSlice, selectUser } from './features/Auth/authSlice'
import { ProtectedRoute } from './utils/auth'
import Header from './components/Header'
import { Test } from './features/Test/Test'
import { firebaseApp } from './utils/firebase'

const { Content } = Layout

const StyledContent = styled(Content)`
  min-height: 480px;
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
      // detaching the listener
      if (user?.email) {
        dispatch(authSlice.actions.setUser({ email: user.email }))
        console.log('yes, user already authenticated in', user)
        if (isLoading) {
          setIsLoading(false)
        } else {
          history.push('/home')
        }
      } else {
        console.log('no, user is not authenticated')
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

          <ProtectedRoute exact path="/test">
            <Test />
          </ProtectedRoute>

          <Route path="*">
            <Redirect to={isAuthenticated ? '/tables' : '/login'} />
          </Route>
        </Switch>
      </StyledContent>
    </Layout>
  )
}

export default App
