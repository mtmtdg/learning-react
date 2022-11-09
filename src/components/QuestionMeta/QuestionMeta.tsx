import { Dispatch, SetStateAction, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Question } from '../../models';
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

  useEffect(() => {
    /* auto: qType changed => render UI only => (other op) => change event & update model
     * manual: qType changed => render UI only => manual update model
     * [auto] can also prevents user from submitting, but the button status will be wrong for a moment
     * so, [manual]
     */
    setValue('answer', null);
  }, [qTypeValue]);

  return (
    <div className={styles.QuestionMeta}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title', { required: false })} />

        <label>Type</label>
        <select {...register('qType', { required: true })}>
          <option value="single">single</option>
          <option value="multi">multi</option>
        </select>

        <label>Content</label>
        <textarea {...register('content', { required: true })} />

        <label>Answer</label>
        <div>
          {/* just dynamically change {type} cause data model (data type) not updated correctly
           * single("A") => multi(expected ["A"]) => change multi(expected ["A", "B"]) but get "B"
           * multi(["A", "B"]) => single(expected ["A"] or ["B"] or null) => change single(expected "A") but get ["A"]
           * entire <input> should be re-rendered
           * angular differentiates [attr.type] from [type] but react seems not
           */}
          {options.map((option, i) => (
            <label key={i}>
              {/* MDN: return type of a input is always string */}
              {qTypeValue === 'single' && (
                <input
                  style={{ display: 'inline' }}
                  type="radio"
                  value={i}
                  {...register('answer', { required: true })}
                />
              )}
              {qTypeValue === 'multi' && (
                <input
                  style={{ display: 'inline' }}
                  type="checkbox"
                  value={i}
                  {...register('answer', { required: true })}
                />
              )}
              {option}
            </label>
          ))}
        </div>

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
