import { Redirect, Route, RouteProps } from 'react-router'

import { selectUser } from '../features/Auth/authSlice'
import { useAppSelector } from '../redux'

export interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser)

  if (user?.email) {
    return <Route {...routeProps} />
  } else {
    return <Redirect to={{ pathname: '/login' }} />
  }
}
