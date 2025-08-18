'use client'
import { Autocomplete, Box } from "@mui/material";
import FeedbackFilters from "./feedback.filters";
import * as React from "react";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../redux/hook/hook";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
const Scores = ["false", "true",]
export default function AdminFilters() {
    const [value, setValue] = React.useState<string | null>(Scores[0]);
    const [inputValue, setInputValue] = React.useState('');
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        const debounce = setTimeout(() => {

            dispatch(
                getFeedbackThunk({
                    deleted: value ?? "",
                    limit:2
                })
            );
        }, 500);
        return () => clearTimeout(debounce);
    }, [dispatch, value]);

    return (
        <>  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FeedbackFilters />
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={Scores}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="deleted feedbacks" />}
            />
        </Box>
        </>
    )
}