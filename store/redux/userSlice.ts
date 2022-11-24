import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '../store';
import axios from "axios";
import {googleLogout} from "@react-oauth/google";

export interface AuthUserState {
    name: string;
    picture: string;
    email: string;
}

export interface UsersState {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
}


export interface UserState {
    authUser: AuthUserState;
    filter: {
        nameStartsWith: string;
        nameEndsWith: string;
    },
    users: UsersState[];
}

const initialState: UserState = {
    authUser: {
        name: '',
        picture: '',
        email: '',
    },
    filter: {
        nameStartsWith: 'G',
        nameEndsWith: 'W',
    },
    users: [],
};

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAll',
    async (filter: { nameStartsWith: string, nameEndsWith: string }) => {
        try {
            const {data: {data: users}} = await axios.get('https://reqres.in/api/users?per_page=12');

            return users?.filter((user: { first_name: string, last_name: string }) => {
                if (!filter.nameStartsWith || !filter.nameEndsWith) {
                    return user;
                }

                return (user.first_name[0] === filter.nameStartsWith || user.last_name[0] === filter.nameEndsWith);
            });
        } catch (e) {
            if (process.env.NEXT_PUBLIC_ENV === 'development') {
                console.log(e.message, 'The\'s an error while requesting the API');
            }
        }
    }
);

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAuthUser: (state, action: PayloadAction<AuthUserState>) => {
            state.authUser = action.payload;
        },
        resetFilter: (state) => {
            state.filter = {
                nameStartsWith: '',
                nameEndsWith: '',
            }
        },
        updateNameStartsWith: (state, action) => {
            state.filter.nameStartsWith = action.payload
        },
        updateNameEndsWith: (state, action) => {
            state.filter.nameEndsWith = action.payload
        },
        logoutUser: (state) => {
            /** logout google oauth 2 */
            googleLogout();

            /** clear and reset state */
            window.localStorage.removeItem('credential');

            state.authUser = {
                name: "",
                picture: "",
                email: "",
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    },
});

export const {
    addAuthUser,
    resetFilter,
    updateNameStartsWith,
    updateNameEndsWith,
    logoutUser
} = counterSlice.actions;

export const selectAuthUser = (state: AppState) => state.user.authUser;
export const selectUsers = (state: AppState) => state.user.users;
export const selectFilter = (state: AppState) => state.user.filter;

export default counterSlice.reducer;
