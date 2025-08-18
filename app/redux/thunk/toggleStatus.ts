import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';



export const toggleStatus = createAsyncThunk(
    'auth/login',
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/feedback/${id}`,
            
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


