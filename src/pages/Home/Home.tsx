import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/zh';
import { useState } from 'react';

interface HomeProps {}

export default function Home(props: HomeProps) {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    /* 本地化要配合 import dayjs/locale/zh */
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh">
      <DatePicker
        label="Basic example"
        inputFormat="YYYY/MM/DD"
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
