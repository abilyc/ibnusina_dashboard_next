import type { } from '@mui/lab/themeAugmentation';
import * as React from 'react';
import { TextField } from '@mui/material';

function EditTitle (props:{handleInput:any, title:string|undefined}){
  const {handleInput, title} = props;
    return (
        <div>
        <TextField
          id="filled-helperText"
          fullWidth={true}
          label="Ubah judul"
          defaultValue={ title }
          onChange={handleInput}
          variant="outlined"
        />
      </div>
    )
}

export default EditTitle;