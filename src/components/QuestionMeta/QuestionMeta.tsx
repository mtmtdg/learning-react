import { ChangeEvent, useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Question } from '../../models';
import CheckGroup from '../CheckGroup/CheckGroup';
import RadioGroup from '../RadioGroup/RadioGroup';
import RDWEditor from '../RDWEditor/RDWEditor';
import styles from './QuestionMeta.module.scss';

interface QuestionMetaProps {
  question?: Question;
  setQuestion: (q: Question) => void;
}

export default function QuestionMeta({ question, setQuestion }: QuestionMetaProps) {
  const {
    register,
    unregister,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields },
    getValues,
    control,
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: question, // not trigger form re-render after question changed, tends to keep edited values
  });
  const onSubmit: SubmitHandler<any> = data => setQuestion(Object.assign({}, question, data));

  // check on init
  useEffect(() => {
    trigger();
  }, []);

  // manually re-render form after question changed
  useEffect(() => {
    reset(); // react-hook-form bug: reset(question) does not clear all value and then set value
    reset(question);
    /* DANGER react-hook-form bugs */
    trigger(); // trigger 'answer' validation
    setTimeout(trigger, 0); // trigger 'title, qType, content validation'
  }, [question]);

  const [qTypeValue, contentValue] = watch(['qType', 'content']);
  const options: string[] = contentValue?.split('\n').filter((x: string) => x) || [];

  const isFeedBack: boolean = useMemo(() => {
    return qTypeValue === 'input';
  }, [qTypeValue]);

  const handleQTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    /* auto: qType changed => render UI only => (other op) => change event & update model
     * manual: qType changed => render UI only => manual update model
     * [auto] can also prevents user from submitting, but the button status will be wrong for a moment
     * so, [manual]
     */

    /*
     * not useEffect: setValue will be called after init, because qType changed from '' to 'single'
     */
    setValue('answer', null);

    // 'content' can be controlled correctly on template
    // only 'answer' needs to control manually, maybe child component cannot get newest value in onchangeevent
    const latestQTypeValue = e.currentTarget.value;
    if (latestQTypeValue === 'input') {
      setValue('content', '');
      setValue('analysis', '');
      unregister(['answer']);
    } else {
      register('answer', { required: true });
    }
    trigger();
  };

  return (
    <div className={styles.QuestionMeta}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        {/*
            <RdwEditor initRowData={getValues()} updateFormFieldValue={value => setValue('title', value)} />

            is the simplest way,but lacks form validation
          */}
        <Controller
          control={control}
          name="title"
          render={({ field }) => <RDWEditor initRowData={getValues()} updateFormFieldValue={field.onChange} />}
          rules={{ required: true }}
        />

        <label>Type</label>
        <select {...register('qType', { required: true, onChange: handleQTypeChange })}>
          <option value="single">single</option>
          <option value="multi">multi</option>
          <option value="input">input</option>
        </select>

        {!isFeedBack && (
          <div>
            <label>Content</label>
            <textarea {...register('content', { required: true })} />

            <label>Answer</label>
            {qTypeValue === 'single' && (
              <RadioGroup options={options} registed={register('answer', { required: true })} />
            )}
            {qTypeValue === 'multi' && (
              <CheckGroup options={options} registed={register('answer', { required: true })} />
            )}

            <label>Analysis</label>
            <input {...register('analysis')} />
          </div>
        )}

        <button disabled={isError(errors)}>ok</button>
        <div>{JSON.stringify(watch())}</div>
        <div>{JSON.stringify(sanitize(errors))}</div>
      </form>
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
