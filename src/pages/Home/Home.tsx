import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import styles from './Home.module.css';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import FormikInput from '../../components/formTools/FormikInput/FormikInput';
import SubmitButton from '../../components/formTools/SubmitButton/SubmitButton';

interface HomeProps {}

const schema = z.object({
  firstName: z.string().min(5),
  lastName: z.string().min(5),
  email: z.string().email(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
  console.log(values);
  setSubmitting(false);
};

export default function Home(props: HomeProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(schema),
    onSubmit,
    validateOnMount: true,
  });

  const { handleSubmit } = formik;

  return (
    <div className={styles.Home}>
      <div>Home works!</div>

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormikInput label="First Name" name="firstName" />
          <FormikInput label="Last Name" name="lastName" />
          <FormikInput label="Email Address" name="email" />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </FormikProvider>

      <button onClick={() => console.log(formik.values)}>debug</button>
    </div>
  );
}
