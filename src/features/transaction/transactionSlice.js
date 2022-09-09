import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    getTransactions,
    getTotalTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
} from "./transactionAPI";

const initialState = {
    transactions: [],
    transactionCount: 0,
    isLoading: false,
    isError: false,
    error: '',
    editing: {},
}

//async thunks
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async ({type, search, page, limit}) => {
    const transactions = await getTransactions({type, search, page, limit});
    return transactions;
});

export const fetchTotalTransactions = createAsyncThunk('transaction/fetchTotalTransactions', async ({type, search}) => {
    const transactions = await getTotalTransactions({type, search});
    return transactions.length;
});

export const createTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
});

export const updateTransaction = createAsyncThunk('transaction/editTransaction', async ({id, data}) => {
    const transaction = await editTransaction(id, data);
    return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
})

//create slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        clearActive: (state) => {
            state.editing = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
            .addCase(fetchTotalTransactions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTotalTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactionCount = action.payload;
            })
            .addCase(fetchTotalTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactionCount = 0;
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
                state.transactions[index] = action.payload;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.meta.arg);
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })

    }
});

export default transactionSlice.reducer;
export const {editActive, clearActive} = transactionSlice.actions;