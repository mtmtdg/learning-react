import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/zh';
import { useState } from 'react';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

/**
 * https://mui.com/zh/x/introduction/licensing/
 * import { LicenseInfo } from '@mui/x-license-pro';
 * LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');
 */

/**
 * 除此之外
 * https://github.com/hypeserver/react-date-range
 * 是个还算漂亮的选择,但不是mui
 */

interface HomeProps {}

export default function Home(props: HomeProps) {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [range, setRange] = useState<DateRange<Dayjs>>([null, null]);

  return (
    <>
      {/* 本地化要配合 import dayjs/locale/zh */}
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
      <div>{JSON.stringify(value)}</div>

      <div style={{ height: '40px' }}></div>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh">
        <DateRangePicker
          value={range}
          onChange={setRange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              to
              <TextField {...endProps} />
            </>
          )}
        />
      </LocalizationProvider>
      <div>{JSON.stringify(range)}</div>
    </>
  );
}
