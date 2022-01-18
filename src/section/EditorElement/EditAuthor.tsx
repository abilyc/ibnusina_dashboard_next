import { Autocomplete, TextField } from "@mui/material";
import { useEffect} from "react";
import { useFetcher } from "src/contexts/FetcherContext";


export default function EditAuthor(props: {default: string, onChange: any}){
    const {setType, data, isLoading} = useFetcher()
    useEffect(()=>{
        setType('users')
    })


    return (
        <Autocomplete 
            freeSolo
            onChange={props.onChange}
            defaultValue={props.default}
            options={!isLoading ?[...new Set(data?.users?.map((v: object)=>v.callName).filter((v: object)=>v!==null))] : [props.default]}
            renderInput={p => <TextField {...p} label='AUTHOR'/>}
        />
    )    
}