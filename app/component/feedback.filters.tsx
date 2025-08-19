"use client";
import { TextField, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
import { TagInfo, TagDetails } from "../redux/slice/tags.slice";
import { UserDetails, UserSearch } from "../redux/slice/author.slice";
import { useEffect, useState } from "react";
const Scores = ["ASC", 'DESC']
export default function FeedbackFilters() {
    const dispatch = useAppDispatch();

    const tagDetails = useAppSelector((state) => state.tags.tagDetails) ?? [];
    const authorDetails = useAppSelector((state) => state.author.userDetails) ?? [];

    const [searchValue, setSearchValue] = useState("");
    const [selectedTags, setSelectedTags] = useState<TagDetails[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<UserDetails[]>([]);
    const [value, setValue] = useState<string | null>(Scores[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        dispatch(TagInfo());
        dispatch(UserSearch());
    }, [dispatch]);


    useEffect(() => {
        const debounce = setTimeout(() => {

            dispatch(
                getFeedbackThunk({
                    searchValue: searchValue.trim() || undefined,
                    tags: selectedTags.map((t) => t.id),
                    authors: selectedAuthors.map((a) => a.id),
                    limit: 2,
                    sortOrder:value??"ASC"
                })
            );
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchValue, selectedTags, selectedAuthors, dispatch,value]);

    return (
        <Box display="flex" gap={2} flexWrap="wrap">

            <TextField
                label="Title or Description"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ width: 250 }}
            />
            <Autocomplete
                multiple
                disablePortal
                options={tagDetails}
                getOptionLabel={(option) => option.tagName}
                value={selectedTags}
                onChange={(_, newValue) => setSelectedTags(newValue)}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />
            <Autocomplete
                multiple
                disablePortal
                options={authorDetails}
                getOptionLabel={(option) => option.userName}
                value={selectedAuthors}
                onChange={(_, newValue) => setSelectedAuthors(newValue)}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Authors" />}
            />
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
                renderInput={(params) => <TextField {...params} label="score" />}
            />
        </Box>
    );
}
