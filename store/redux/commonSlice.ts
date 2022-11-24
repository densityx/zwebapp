import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '../store';

export interface MenuLink {
    id: number;
    name: string;
    slug: string;
}

export interface UserState {
    headerMenus: MenuLink[];
    footerMenus: MenuLink[];
}

const initialState: UserState = {
    headerMenus: [
        {
            id: 1,
            name: 'Profile',
            slug: '/profile',
        },
        {
            id: 2,
            name: 'Users',
            slug: '/users',
        },
    ],
    footerMenus: [
        {
            id: 1,
            name: '©2022 Ahmad Aziz',
            slug: 'https://www.linkedin.com/in/densityx/',
        },
        {
            id: 2,
            name: 'Source Code',
            slug: 'https://github.com/densityx/zwebapp',
        },
        {
            id: 3,
            name: 'About',
            slug: '/about',
        },
    ]
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        addHeaderMenu: (state, action: PayloadAction<MenuLink>) => {
            state.headerMenus.push(action.payload)
        },
        addFooterMenu: (state, action: PayloadAction<MenuLink>) => {
            state.footerMenus.push(action.payload)
        },
    }
});

export const {
    addHeaderMenu,
    addFooterMenu
} = commonSlice.actions;

export const selectHeaderMenus = (state: AppState) => state.common.headerMenus;
export const selectFooterMenus = (state: AppState) => state.common.footerMenus;

export default commonSlice.reducer;
