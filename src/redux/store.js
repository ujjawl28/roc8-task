import {configureStore} from '@reduxjs/toolkit';
import favoritesReduser from './reduxSlice';


let store = configureStore({
    reducer:{
        favorite:favoritesReduser,
    }
})

export default store;