'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddComment } from '../redux/thunk/comment.thunk';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Stack } from '@mui/material';
import ViewComments from './ViewComments';

interface FormDialogProps {
  feedbackId: number;
  comments:[]
}
export default function FormDialog({ feedbackId,comments }: FormDialogProps) {
  const token = useAppSelector((state) => state.login.auth?.token);
  
  const [open, setOpen] = React.useState(false);
  const [openViewComment, setOpenViewComment] = React.useState(false)
  const dispatch = useAppDispatch();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const commentData: any = Object.fromEntries(formData.entries());
    commentData.feedbackId = feedbackId;


    const res = await dispatch(AddComment(commentData));;
    if (!token) { toast("Login to Add Comments") }
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Comment Added!");
    } else {
      toast.error(res.payload || " Not able to comment");
    }
    handleClose();
  };
  return (
    <>

      <Stack direction={"row"} spacing={2}>
        <ToastContainer />
        <Button color="primary" onClick={handleClickOpen}>
          Add Comment
        </Button>
        <Button onClick={() => setOpenViewComment(!openViewComment)}>View Comment</Button>
      </Stack>
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your Comment on this feedback
          </DialogContentText>
          <form onSubmit={handleSubmit} id="comment-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="comment"
              name="content"
              label="Comment"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="comment-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openViewComment}
        onClose={() => setOpenViewComment(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent dividers>
          <ViewComments comment={comments}  />
        </DialogContent>
      </Dialog>
    </>
  );
}
