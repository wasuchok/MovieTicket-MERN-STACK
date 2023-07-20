import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  email: string;
  isAdmin: boolean;
  username?: string;
  isLogin : boolean
  _id?: string;
}

interface UserState {
  userinfo: UserInfo;
}

const initialState: UserState = {
  userinfo : {
    email : '',
    isAdmin : false,
    isLogin : false
  }
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userLogin: (state : UserState, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload
    },
    logOut : (state : UserState) => {
      state.userinfo = {
        email : '',
        isAdmin : false,
        isLogin : false
      }
      localStorage.removeItem('userinfo')
    }
  },
})


export const { userLogin, logOut } = userSlice.actions

export default userSlice.reducer