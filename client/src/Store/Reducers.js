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

