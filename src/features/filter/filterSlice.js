import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    type: '',
    search: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        typeFilter: (state, action) => {
            state.type = action.payload;
        },
        searchFilter: (state, action) => {
            state.search = action.payload
        },
        resetAllFilters: state => {
            state.type = [];
            state.search = '';
        }
    }
})

export default filterSlice.reducer;
export const {typeFilter, searchFilter, resetAllFilters} = filterSlice.actions;
