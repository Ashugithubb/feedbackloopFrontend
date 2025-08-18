'use client'
import AdminFilters from "@/app/component/AdminFilters";
import AllFeedbackList from "@/app/component/Feedback";
import Navbar from "@/app/component/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, DialogContent, TextField } from "@mui/material";
import { Dialog } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";

export const disableUserSchema = z.object({
    userName: z.string().min(3, { message: "User name can't be empty" })
});

export type DisableUserFormData = z.infer<typeof disableUserSchema>;

export default function Admin() {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<DisableUserFormData>({
        resolver: zodResolver(disableUserSchema),
        defaultValues: {
            userName: ''
        },
    });
    const handleClose = () => {
        setOpen(false);
    }
    const onSubmit = async (data: DisableUserFormData) => {
        const userName = data.userName
        try{
            const res = await axios.delete(`http://localhost:3001/user/${userName}/disable`,{
                withCredentials:true
            })
            
           toast(`${res.data}`);
        }
        catch(err){
            console.log(err)
             toast(`${err}`);
        }

        // const res = await dispatch(addFeedback(userName));
        // if (res.meta.requestStatus === 'fulfilled') {
        //   toast.success("Feedback added successfully!");
        // } else {
        //   toast.error(res.payload || "Failed");
        // }
    };
    return (
        <>
            <Navbar />
            <h1>Admin DashBoard</h1>
            <ToastContainer/>
            <Button onClick={() => setOpen(true)} sx={{ display: "flex", justifyContent: "flex-end", ml: "1600px" }} variant="contained">Disable or Unable User</Button>
            <AdminFilters />
            <AllFeedbackList />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent> Disable or Unable User </DialogContent>
                <Box sx={{ margin: "20px 20px 20px 20px" }}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            label="Enter UserName"
                            {...register('userName')}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                            fullWidth
                            margin="normal"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleClose}
                        >
                            Disable
                        </Button>

                    </form>
                    <Button onClick={handleClose}>Cancel</Button>
                </Box>
            </Dialog>
        </>
    )
}