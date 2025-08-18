import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface ReplyPayload {
 feedbackId:number
  parentId: number;
  content: string;
}

export const addReply = createAsyncThunk(
  'comment/addReply',
  async (data: ReplyPayload, thunkAPI) => {
    const {parentId} = data;
    try {
      const response = await axios.post(
        `http://localhost:3001/comment/${parentId}`, 
        {
          feedbackId:data.feedbackId,
          content: data.content,
          
        },
        { withCredentials: true }
      );
      console.log("parent comment Thunk",response.data);
      return response.data; 
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
