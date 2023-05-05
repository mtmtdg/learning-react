import { useField } from 'formik';
import { CommonFormProps } from '../CommonFormProps';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type FormikTextArrayProps = CommonFormProps & {};

export default function FormikTextArray({ label, name, required = false, disabled = false }: FormikTextArrayProps) {
  const [{ value, onBlur }, { error, touched }, { setValue }] = useField({ name });

  const [focused, setFocused] = useState(false);
  const [userInput, setUserInput] = useState(value.join('\n'));

  useEffect(() => {
    if (!focused) {
      setUserInput(value.join('\n'));
    }
  }, [value, focused]);

  return (
    <TextField
      multiline
      label={label}
      error={touched && !!error}
      helperText={touched ? error : ''}
      value={userInput}
      onFocus={() => setFocused(true)}
      onBlur={e => {
        setFocused(false);
        onBlur(e);
      }}
      onChange={event => {
        const uInput = event.target.value;
        const options = uInput
          .split('\n')
          .map(x => x.trim())
          .filter(x => x);

        setValue(options);
        setUserInput(uInput);
      }}
    />
  );
}
