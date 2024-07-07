// 'use client'

// import { userService } from "@/services/user.service"
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// // const isLogin = await userService.isLoggedIn()
// // console.log(isLogin)
// const initialState = {
//     loggedInUser: {
//         name: '',
//         isAdmin: false
//     } as unknown as LoggedInUser
// } as InitialState

// export const auth = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logOut: () => {
//             return initialState
//         },
//         login: (state, action: PayloadAction<LoggedInUser>) => {
//             return {
//                 InUser: {
//                     name: action.payload.name,
//                     isAdmin: action.payload.isAdmin
//                 }
//             }
//         }
//     }
// })

// export const { logOut, login } = auth.actions
// export default auth.reducer