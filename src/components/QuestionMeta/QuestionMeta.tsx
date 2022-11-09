import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Question } from '../../models';
import CheckGroup from '../CheckGroup/CheckGroup';
import RadioGroup from '../RadioGroup/RadioGroup';
import styles from './QuestionMeta.module.scss';

interface QuestionMetaProps {
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
}

export default function QuestionMeta({ question, setQuestion }: QuestionMetaProps) {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields },
    getValues,
    setValue,
  } = useForm({
    mode: 'all',
    defaultValues: question,
  });
  const onSubmit: SubmitHandler<any> = data => setQuestion(data);

  // check on mount
  useEffect(() => {
    trigger();
  }, []);

  const [qTypeValue, contentValue] = watch(['qType', 'content']);
  const options: string[] = contentValue?.split('\n').filter((x: string) => x) || [];

  const handleQTypeChange = (e: SyntheticEvent) => {
    /* auto: qType changed => render UI only => (other op) => change event & update model
     * manual: qType changed => render UI only => manual update model
     * [auto] can also prevents user from submitting, but the button status will be wrong for a moment
     * so, [manual]
     */

    /*
     * not useEffect: setValue will be called after init, because qType changed from '' to 'single'
     */
    setValue('answer', null);
  };

  return (
    <div className={styles.QuestionMeta}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title', { required: false })} />

        <label>Type</label>
        <select {...register('qType', { required: true, onChange: handleQTypeChange })}>
          <option value="single">single</option>
          <option value="multi">multi</option>
        </select>

        <label>Content</label>
        <textarea {...register('content', { required: true })} />

        <label>Answer</label>
        {qTypeValue === 'single' && <RadioGroup options={options} registed={register('answer', { required: true })} />}
        {qTypeValue === 'multi' && <CheckGroup options={options} registed={register('answer', { required: true })} />}

        <label>Analysis</label>
        <input {...register('analysis')} />

        <button disabled={isError(errors)}>ok</button>
        <div>{JSON.stringify(sanitize(errors))}</div>
        <button onClick={() => console.log(getValues())}>log</button>
      </form>

      <div>{JSON.stringify(watch())}</div>
    </div>
  );
}

function isError(errors: Object): boolean {
  return Object.keys(errors).length !== 0;
}

function sanitize(errors: Object): Object {
  const res = {};
  for (const [key, value] of Object.entries(errors)) {
    const newValue = Object.assign(value || {}, { ref: undefined });
    Object.assign(res, { [key]: newValue });
  }
  return res;
}
