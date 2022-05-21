import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

interface IUserGoogleData {
    email: string
}

interface IUserPasswordData {
    email: string
    password: string
}

interface IUser {
    _id: string;
    email: string;
    token: string;
    role: string;
}

export const login = createAsyncThunk("auth/login", async (user: IUserGoogleData, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch(error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginWithPassword = createAsyncThunk("auth/login2", async (user: IUserPasswordData, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch(error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const logout =   createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

const user:IUser = JSON.parse(String(localStorage.getItem("user")))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = String(action.payload);
            state.user = null;
        })
        .addCase(loginWithPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginWithPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(loginWithPassword.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = String(action.payload);
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer