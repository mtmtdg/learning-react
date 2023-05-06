import { TextField } from '@mui/material';
import { useField } from 'formik';
import { CommonFormProps } from '../CommonFormProps';
import { HTMLInputTypeAttribute } from 'react';
import { number } from 'zod';

type FormikInputProps = CommonFormProps & { type?: HTMLInputTypeAttribute };

export default function FormikInput({
  label,
  name,
  type = 'text',
  required = false,
  disabled = false,
}: FormikInputProps) {
  const [field, state, { setValue }] = useField({ name });
  const { error, touched } = state;

  return (
    <TextField type={type} label={label} error={touched && !!error} helperText={touched ? error : ''} {...field} />
  );
}
