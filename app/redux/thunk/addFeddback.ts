import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { feedbackSchema } from '@/app/schema/feedback.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const addFeedback = createAsyncThunk(
  'auth/signup',
  async (data: FeedbackFormData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/feedback',
        data,
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

