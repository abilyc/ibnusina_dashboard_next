import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
// import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';

export default function ResponsiveDateTimePickers({ dateValue, handleDate }: { dateValue: string, handleDate: any }) {
  // const tgl = new Date(+dateValue);
  // const t = Math((tgl.getTime() / 1000));
  // console.log(dateValue);
  // console.log(new Date(+dateValue));
  const [value, setValue] = React.useState<Date | null>(
    new Date(+dateValue)
  );
  // console.log(value?.valueOf().toString());
  // const x = value && Math.floor((new Date(+value)).getTime() / 1000);
  // console.log(value?.toISOString());
  // console.log(x);
  let d = value! ;
  // let l = d.toLocaleDateString();
  // const m = Date.parse(d.toLocaleDateString()).toString();
  // const date = d.toISOString().toString();
  // https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
  // referensi: https://stackoverflow.com/questions/9756120/how-do-i-get-a-utc-timestamp-in-javascript
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDateTimePicker
          value={value}
          onClose={handleDate(d)}
          // onAccept={handleDate(x)}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
