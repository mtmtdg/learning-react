import { FieldArray, FormikHelpers, FormikProvider, useFormik } from 'formik';
import styles from './Home.module.css';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import FormikInput from '../../components/formTools/FormikInput/FormikInput';
import SubmitButton from '../../components/formTools/SubmitButton/SubmitButton';
import FormikTextArray from '../../components/formTools/FormikTextArray/FormikTextArray';
import { Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface HomeProps {}

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  test: z.string().array(),
  arr: z.object({ a: z.string(), b: z.string() }).array(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  test: [],
  arr: [
    { a: '1', b: '2' },
    { a: '2', b: '3' },
  ],
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
  });

  const { values, handleSubmit } = formik;

  return (
    <div className={styles.Home}>
      <div>Home works!</div>

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormikInput label="First Name" name="firstName" />
          <FormikInput label="Last Name" name="lastName" />
          <FormikInput label="Email Address" name="email" />
          <FormikTextArray label="test" name="test" />
          {/* Formik(issues1476)说想添加一个useFieldArray来获取render中的arrayHelper参数,但最终没有人负责搞出来,仅有人自己封装一些hook */}
          <FieldArray
            name="arr"
            render={arrayHelpers => {
              return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {values.arr?.map((group, index) => (
                    <div key={index}>
                      <FormikInput label="a" name={`arr.${index}.a`} />
                      <FormikInput label="b" name={`arr.${index}.b`} />
                      <IconButton onClick={() => arrayHelpers.remove(index)}>
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                  <IconButton onClick={() => arrayHelpers.push({ a: '', b: '' })}>
                    <Add />
                  </IconButton>
                </div>
              );
            }}
          />
          <SubmitButton>Submit</SubmitButton>
        </form>
      </FormikProvider>

      <button onClick={() => console.log(formik)}>debug</button>
    </div>
  );
}
