import { configureStore } from '@reduxjs/toolkit';
import auth from './Reducers';

export const store = configureStore({
    reducer: {
        auth: auth
    }
})