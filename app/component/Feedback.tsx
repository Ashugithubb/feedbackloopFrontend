'use client';

import { Box, Button, CardContent, Typography, Stack, Pagination, Avatar, IconButton, Icon, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { useEffect, useState } from "react";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
import Card from '@mui/material/Card';
import FormDialog from "./addComment";
import { AddVotes } from "../redux/thunk/votes.thunk";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast, ToastContainer } from "react-toastify";
import CommentList from "./ViewComments";

export default function AllFeedbackList() {
  const dispatch = useAppDispatch();
  const [addComment, setAddComment] = useState(false);
  const [score, setScore] = useState(0);

  const { feedbacklist, loading, error } = useAppSelector((state) => state.feedback)
  const { feedback = [], total = 0, limit = 0, page = 1 } = feedbacklist ?? {};
  

  const token = useAppSelector((state) => state.login.auth?.token);
  useEffect(() => {
    dispatch(getFeedbackThunk({ limit: 2, page }));
  }, [dispatch, page]);

  const totalPages = Math.ceil(total / (limit || 1));

  const handleUpvote = (id: number) => {
    if (!token) { toast("Login to upvote") }
    dispatch(AddVotes({ feedbackId: id, voteType: "up" }));
  };

  const handleDownvote = (id: number) => {
    if (!token) { toast("Login to downvote") }
    dispatch(AddVotes({ feedbackId: id, voteType: "down" }));
  };

  return (
    <>
      <ToastContainer />
      {feedback?.length > 0 ? (
        <>
          {feedback.map((c?: any, index?: number) => (
            <Box key={index}>

              <Card sx={{ height: "400px", width: "800px", margin: "0 auto", mt: 4, p: 2, background: "#D3D3D3" }}>
                <Card sx={{ background: "white", width: "750px", height: "350px", marginLeft: "11px", marginTop: "10px" }}>
                  <CardContent>

                    <Stack direction={'row'} >
                      <Stack direction="column" >
                        <IconButton onClick={() => handleUpvote(c.id)}><KeyboardArrowUpIcon sx={{ fontSize: "70px", color: "black" }} /></IconButton>
                        <Typography sx={{ marginLeft: "21px", fontSize: "55px" }}>{c.upVotes - c.downVotes}</Typography>
                        <IconButton onClick={() => handleDownvote(c.id)}><KeyboardArrowDownIcon sx={{ fontSize: "70px", color: "black" }} /></IconButton>
                      </Stack>

                      <Stack direction={"column"} sx={{ marginLeft: "30px" }}>
                        <Stack direction={"row"} sx={{ marginTop: "5px", display: "flex" }}>

                          <Avatar alt={c?.user?.userName} src={c?.user?.userName} />
                          <Typography variant="h5" component="div" sx={{ marginLeft: "10px" }}>
                            {c?.user?.userName}
                          </Typography>
                        </Stack>
                        <Stack sx={{ marginTop: "15px" }}>
                          <Typography variant="h5" component="div">
                            {c.title}
                          </Typography>
                          <Typography color="text.secondary" sx={{ mb: 2 }}>
                            {c.description}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {c.feedbackTag.map((t: any, index: number) => (
                              <Chip
                                sx={{ color: "#3373C4" }}
                                key={index}
                                label={t.tag.tagName}
                              />
                            ))}
                          </Stack>

                        </Stack>

                        <Box sx={{ display: "flex", marginLeft: "295px", gap: 2, height: "50px", marginTop: "55px" }}>

                          <FormDialog feedbackId={c.id} comments={c.comment} />
                        </Box>
                      </Stack>
                    </Stack>


                  </CardContent>
                </Card>
              </Card>
            </Box>
          ))}


          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(_, value) => {
                  dispatch(getFeedbackThunk({ page: value, limit }));
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography>No Feedback Found</Typography>
      )}



    </>

  );
}
