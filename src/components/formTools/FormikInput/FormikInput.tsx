import { TextField } from '@mui/material';
import { useField } from 'formik';
import { CommonFormProps } from '../CommonFormProps';

type FormikInputProps = CommonFormProps & {};

export default function FormikInput({ label, name, required = false, disabled = false }: FormikInputProps) {
  const [field, state] = useField({ name });
  const { error, touched } = state;

  return <TextField label={label} error={touched && !!error} helperText={touched ? error : ''} {...field} />;
}
