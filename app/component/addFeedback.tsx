"use client"
import { Controller, useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, FeedbackFormData } from '../schema/feedback.schema';
import { Box, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';
import { addFeedback } from '../redux/thunk/addFeddback';
import { set } from 'zod';
import { useState } from 'react';

export default function FeedbackForm() {
  const [open, setOpen] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: '',
      description: '',
      status: "Public", 
      tags: [],
    },
  });
  
  const availableTags = useAppSelector((state) => state.tags.tagDetails);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    console.log("close")
    setOpen(false);
  }
  const onSubmit = async (data: FeedbackFormData) => {
    console.log(data);
    const res = await dispatch(addFeedback(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Feedback added successfully!");
    } else {
      toast.error(res.payload || "Failed");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {handleClose}}
      >
        <DialogTitle>Add Feedback</DialogTitle>
      <ToastContainer/>
      <Box sx={{margin:"20px 20px 20px 20px"}}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Feedback Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
          />

        <TextField
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
          />

        
        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Status">
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
            )}
            />
          {errors.status && (
            <span style={{ color: 'red', fontSize: '0.8em' }}>
              {errors.status.message}
            </span>
          )}
        </FormControl>

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
            multiple
            freeSolo
            options={availableTags?.map((t) => t.tagName) || []}
            value={field.value || []}
            onChange={(_, newValue) => {
              const uniqueTags = [...new Set(newValue.map((tag) => tag.trim()))];
              field.onChange(uniqueTags);
            }}
            renderInput={(params) => (
              <TextField
              {...params}
                  label="Tags"
                  placeholder="Add tags"
                  error={!!errors.tags}
                  helperText={errors.tags?.message as string}
                  />
                )}
                />
              )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          >
          Post Feedback
        </Button>
      </form>
      </Box>
     
        <Button onClick={handleClose}>Cancel</Button>

      </Dialog>
   
  );
}
