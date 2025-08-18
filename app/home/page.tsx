'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../component/navbar";
import AllFeedbackList from "../component/Feedback";
import FeedbackFilters from "../component/feedback.filters";
import { Box, Button } from "@mui/material";
import FeedbackForm from "../component/addFeedback";
import { useState } from "react";
import FeedbackList from "../component/MyFeedback";
import { useAppSelector } from "../redux/hook/hook";
import { useRouter } from "next/navigation";

export default function Home() {
  const [openFeedback, setFeedback] = useState(false)
 
  const token = useAppSelector((state)=>state.login.auth?.token);
  const role = useAppSelector((state)=>state.login.auth?.role);
  const router = useRouter()
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 5 }}><FeedbackFilters /></Box>

     
     {role==="User"&&token&& <Box sx={{ display: "flex", justifyContent: "flex-end" }}>  <Button variant="contained" onClick={() => router.push("/home/profile")}>My Feedbacks</Button></Box>}
      {role==="Admin"&&token&& <Box sx={{ display: "flex", justifyContent: "flex-end" }}>  <Button variant="contained" onClick={() => router.push("/home/admin")}>Manage Feedbacks and Users</Button></Box>}
      <AllFeedbackList />
     
    </>
  );
}
//  const [openMyFeedback, setMyFeedback] = useState(false);
     {/* {token&& <Box sx={{ display: "flex", justifyContent: "flex-end" }}>  <Button variant="contained" onClick={() => setMyFeedback(!openMyFeedback)}>My Feedbacks</Button></Box>} */}
      //  <Box sx={{ width: "450px" }}>
      //     {openMyFeedback && <FeedbackList />}
      //   </Box>