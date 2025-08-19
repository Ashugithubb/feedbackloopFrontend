"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { Grid3x3 } from "@mui/icons-material";
import { getMyFeedbackThunk } from "../redux/slice/my.feedback.slice";
import { toggleStatus } from "../redux/thunk/toggleStatus";

export default function FeedbackList() {
  const dispatch = useAppDispatch();
  const { feedbacklist, loading, error } = useAppSelector(
    (state) => state.myfeedback 
  );

  useEffect(() => {
    dispatch(getMyFeedbackThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  const handelToggle = async (feedbackId:number)=>{
      const res = await dispatch(toggleStatus(feedbackId));
  }
 return (
  <Box sx={{ p: 3}}>
    <Typography variant="h4" gutterBottom>
      Feedback List
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {feedbacklist?.map((item) => (
        <Box
          key={item.id}
          sx={{
            flex: "1", 
            minWidth: 300,
          }}
        >
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                {item.description}
              </Typography>
              <Button onClick={()=>handelToggle(item.id)}><Typography variant="body2">
                <strong>Status:</strong> {item.status}
              </Typography></Button>
              <Typography variant="body2">
                👍 {item.upVotes} | 👎 {item.downVotes}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Created: {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  </Box>
);

}
