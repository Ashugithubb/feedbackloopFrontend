'use client'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { any } from 'zod';
import qs from 'qs';

export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface FeedbackTag {
  id: number;
}
export interface Comment{
  id:number,
  content:string,
  createdAt:Date,
  updatedAt:Date,
  deletedAt:Date,
  child:Comment[]
}



export interface Feedback {
  id: number;
  title: string;
  description: string;
  status: string;
  upVotes: number;
  downVotes: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
  feedbackTag: FeedbackTag[];
  comment:Comment[]
}

export interface FeedbackResponse {
  total: number;
  page: number;
  limit: number;
  feedback: Feedback[];
}

interface FeedbackState {
  feedbacklist: FeedbackResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacklist: null,
  loading: false,
  error: null,
};


export interface GetFeedbackQuery {
  page?: number;
  limit?: number;
  searchValue?: string
  tags?: number[]
  authors?: number[]
   sortOrder?:string;
   deleted?:string
}

export const getFeedbackThunk = createAsyncThunk(
  'feedback/getfeedback',
  async (query: GetFeedbackQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/feedback`, {
        withCredentials: true,
        params: query,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch Feedbacks');
    }
  }
);



const feedbackSlice = createSlice({
  name: 'feedbacklist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbackThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbackThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacklist = action.payload;
      })
      .addCase(getFeedbackThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
;

export default feedbackSlice.reducer;