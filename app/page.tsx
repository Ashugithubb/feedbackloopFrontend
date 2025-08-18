'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useAppSelector } from "./redux/hook/hook";
import AllFeedbackList from "./component/Feedback";
import Navbar from "./component/navbar";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    router.push('/home')
  })
  return (
    <>
   </>
  );
}
