import { Autocomplete, TextField } from "@mui/material";
import { useEffect} from "react";
import { useFetcher } from "src/contexts/FetcherContext";

export default function EditCategory(props: {default: string[], onChange: any}){
    const {setType, data, isLoading} = useFetcher()
    useEffect(()=>{
        setType('category')
    })

    console.log(data)

    return (
        <Autocomplete 
            freeSolo
            onChange={props.onChange}
            defaultValue={props.default}
            options={!isLoading ?[...new Set(data?.allCategory?.map((v: any)=>v.title).filter((v: object)=>v!==null))] : [props.default]}
            renderInput={p => <TextField {...p} label='CATEGORY'/>}
        />
    )
}