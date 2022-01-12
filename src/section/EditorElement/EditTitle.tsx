import type { } from '@mui/lab/themeAugmentation';
import { useState, useEffect } from 'react';
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
          // helperText="Some important text"
          variant="outlined"
        />
      </div>
    )
}

export default EditTitle;