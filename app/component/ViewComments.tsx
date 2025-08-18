'use client';

import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Stack, Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { addReply } from "../redux/thunk/AddCommentOnParent";

interface commentedUser{
   id: number,
  user: { userName: string}                 
}
interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  parent?: CommentType | null;
  child?: CommentType[];
  userComment:commentedUser[];
}

interface ViewCommentsProps {
  comment: CommentType[];
  feedbackId:number
}

export default function ViewComments({ comment,feedbackId}: ViewCommentsProps,) {
  const dispatch = useAppDispatch();

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");


  const handleReplySubmit = (parentId: number) => {
    if (!replyContent.trim()) return;
    console.log(parentId);

    dispatch(addReply({
      feedbackId,
      parentId,
      content: replyContent
    }));

    setReplyContent("");
    setReplyingTo(null);
  };

  return (
    <>
      {

        comment?.map((m, idx) => (
          <Box key={idx}>
           <Typography>{m.userComment.map((g)=>g?.user?.userName)}</Typography>
            <Typography>{m.content}</Typography>
            <Typography>{new Date(m.createdAt).toLocaleString()}</Typography>

            <Box>
              <Button size="small" onClick={() => setReplyingTo(m.id)}>
                Reply
              </Button>
            </Box>
            {replyingTo === m.id && (
              <Box sx={{ marginTop: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  variant="contained"
                  onClick={() => handleReplySubmit(m.id)}
                >
                  Post Reply
                </Button>
              </Box>
            )}
            <Box sx={{ marginLeft: "20px" }}>
              <Typography>Replies:</Typography>
              {m.child?.map((reply:any, idx:number) => (
                <Box key={idx} sx={{ marginLeft: "20px" }}>
                  <Typography>{reply.content}</Typography>
                  <Typography>{new Date(reply.createdAt).toLocaleString()}</Typography>
                </Box>
              ))}
            </Box>
          </Box>))
      }
    </>
  );
}

