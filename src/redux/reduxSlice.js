import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    favorites : []
}

const favoriteSlice = createSlice({
    name : 'favorite',
    initialState,
    reducers:{
        select :(state,action)=>{
            state.favorites.push(action.payload);
        },
        remove:(state,action)=>{
            let idx = state.indexOf(action.payload);
            let arr = state.favorites;
            let filteredArr = arr.filter((id,index) => index != idx);
            state.favorites = filteredArr;
        }
    }

});

export default favoriteSlice.reducer;
export const {select,removed} = favoriteSlice.actions;

