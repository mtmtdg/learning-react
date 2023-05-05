import { useFormikContext } from 'formik';
import { Button } from '@mui/material';

interface SubmitButtonProps {}

export default function SubmitButton(props: SubmitButtonProps) {
  const formik = useFormikContext();
  const { isValid, isSubmitting } = formik;

  return (
    <Button type="submit" variant="contained" disabled={isSubmitting || !isValid}>
      debug
    </Button>
  );
}
