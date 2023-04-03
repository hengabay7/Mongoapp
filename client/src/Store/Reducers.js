//IMPORT LIBS
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import actions from './Actions'

//CREATE USER VARIABLE
const user = JSON.stringify(localStorage.getItem('user'));


//INIIAL
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//FUNCTIONS
export const login = createAsyncThunk('/auth/login', async(userData, thunkAPI) => {
    
    try {
        return await actions.login(userData);
    } catch (error) {
        const message = 
        (error.response
            && error.response.data
            && error.response.datamessage)
            || error.message 
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//SLICE
export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {state.isLoading = true})
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload()
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.user = null
            state.message= action.payload
        })
    }
})




//EXPORT
export const { reset } = auth.actions;
export default auth.reducer;