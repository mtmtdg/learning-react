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

/**
 * 神奇的是zop面对一个空字符串,竟然不报错,一个optional既允许undefined,也允许''
 */
const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().optional(),
  test: z.string().array(),
  arr: z.object({ a: z.string(), b: z.string() }).array(),
});

/**
 * 垃圾react认为不能设置值为null,
 * 还不推荐设置undefined(认为是非受控),
 * 最终不得不为一个optional number的字段,设置上初始值''
 * react对此有一些讨论,但不了了之
 * https://github.com/facebook/react/issues/7779
 */

/**
 * formik对此有讨论,但无能力
 * https://github.com/jaredpalmer/formik/issues/1869
 * react hook from有讨论,最终似乎是用setValueAs来做转换
 * https://github.com/orgs/react-hook-form/discussions/6980
 */
const initialValues = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  test: [],
  arr: [
    { a: '1', b: '2' },
    { a: '2', b: '3' },
  ],
};

const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
  // 目前只能从业务上解决number的空字符串问题
  // values.age = undefinedOrNumber(values.age)
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

  const { values, handleSubmit, setFieldValue } = formik;

  return (
    <div className={styles.Home}>
      <div>Home works!</div>

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormikInput label="First Name" name="firstName" />
          <FormikInput label="Last Name" name="lastName" />
          <FormikInput type="number" label="Age" name="age" />
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

      <button onClick={() => console.log(formik.values)}>debug values</button>
      <button onClick={() => console.log(formik.errors)}>debug errors</button>
      <button onClick={() => setFieldValue('age', '')}>set space</button>
      <button onClick={() => setFieldValue('age', null)}>set null</button>
      <button onClick={() => setFieldValue('age', undefined)}>set undefined</button>
    </div>
  );
}
