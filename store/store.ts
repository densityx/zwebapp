import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'

import userReducer from './redux/userSlice'
import commonReducer from './redux/commonSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            common: commonReducer,
            user: userReducer,
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    unknown,
    Action<string>>

export default store