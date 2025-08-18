'use client'
import FeedbackForm from "@/app/component/addFeedback";
import FeedbackList from "@/app/component/MyFeedback";
import Navbar from "@/app/component/navbar";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function MyFeedback() {
    const [openFeedback, setFeedback] = useState(false)
    return (
        <>
        <Navbar/>
            <FeedbackList />    
{ <Button variant="contained" onClick={() => setFeedback(!openFeedback)}>Add Feedback</Button>}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "450px" }}>
                    {openFeedback && <FeedbackForm />}
                </Box>

            </Box>
        </>
    )
}