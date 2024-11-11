import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
    user: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

interface UserState {
    isLogin: boolean;
    name: string;
    email: string;
    profilePic: string;
    _id: string;
    role: string;
    addresses: Address | null;
}

const initialState: UserState = {
    isLogin: false,
    name: '',
    email: '',
    profilePic: '',
    _id: '',
    role: '',
    addresses: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Omit<UserState, 'isLogin'>>) => {
            return {
                ...state,
                isLogin: true,
                ...action.payload,
            };
        },
        logout: (): UserState => {
            return initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
