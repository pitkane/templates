import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { browserSessionPersistence, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseApp } from '../../utils/firebase'

export interface User {
  email: string
}

type SliceState = {
  user: User | null
}

const initialState: SliceState = { user: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        email: action.payload.email,
      }
    },
  },
})

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  const auth = getAuth(firebaseApp)
  await auth.setPersistence(browserSessionPersistence)

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredentials.user

    if (user) {
      console.log('Firebase auth successful', user)
      dispatch(authSlice.actions.setUser({ email }))
    } else {
      console.log('Firebase auth failure')
    }
  } catch (error) {
    console.error('Firebase auth', error)
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  const auth = getAuth(firebaseApp)

  try {
    await signOut(auth)
    dispatch(authSlice.actions.logout())
  } catch (error) {
    console.error(error)
  }
}

export const selectUser = (state: any) => state.auth.user
