import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import styles from './Home.module.css';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import FormikInput from '../../components/formTools/FormikInput/FormikInput';
import SubmitButton from '../../components/formTools/SubmitButton/SubmitButton';
import FormikTextArray from '../../components/formTools/FormikTextArray/FormikTextArray';

interface HomeProps {}

const schema = z.object({
  firstName: z.string().min(5),
  lastName: z.string().min(5),
  email: z.string().email(),
  test: z.string().array().min(2),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  test: [],
};

const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
  console.log(values);
  // formik似乎无法自动将submitting切换为false状态,因此需要手动调用
  // 而useFormik的声明,可能落后于onSubmit的定义,因此onSubmit的第二个参数中,附带了一些动作函数.
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
          <FormikTextArray label="test" name="test" />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </FormikProvider>

      <button onClick={() => console.log(formik)}>debug</button>
    </div>
  );
}
