import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false, // false means user is not authenticated
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.status = true;
        },
        adminLogout: (state) => {
            state.status = false;
        }
    }
});

export const {adminLogin, adminLogout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;