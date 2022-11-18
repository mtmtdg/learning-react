import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Question } from '../../models';
import CheckGroup from '../CheckGroup/CheckGroup';
import RadioGroup from '../RadioGroup/RadioGroup';
import RDWEditor from '../RDWEditor/RDWEditor';
import styles from './QuestionMeta.module.scss';

interface QuestionMetaProps {
  question?: Question;
  setQuestion: (q: Question) => void;
}

const schema = yup.object().shape({
  title: yup.string().required('title is required'),
  qType: yup.string().required('type is required'),
  content: yup
    .string()
    .when('qType', (qType, contentSchema) =>
      qType === 'input' ? contentSchema : contentSchema.required('content is required')
    ),
  answer: yup.mixed().when('qType', (qType, answerSchema) => {
    switch (qType) {
      case 'input':
        return answerSchema;
      case 'single':
        return yup.string().required();
      case 'multi':
        return yup.array().of(yup.string()).min(1).required();
    }
  }),
  analysis: yup.string(),
});

export default function QuestionMeta({ question, setQuestion }: QuestionMetaProps) {
  const {
    register,
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
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<any> = data => setQuestion(Object.assign({}, question, data));

  // check on init
  useEffect(() => {
    trigger();
  }, []);

  // manually re-render form after question changed
  useEffect(() => {
    reset(question);
    trigger();
  }, [question]);

  const [qTypeValue, contentValue] = watch(['qType', 'content']);
  const options: string[] = contentValue?.split('\n').filter((x: string) => x) || [];

  const isFeedBack: boolean = useMemo(() => {
    return qTypeValue === 'input';
  }, [qTypeValue]);

  // now qType change only setvalue, no need to change validation based on latest qType value
  const handleQTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue('answer', null);
    const latestQTypeValue = e.currentTarget.value;
    if (latestQTypeValue === 'input') {
      setValue('content', '');
      setValue('analysis', '');
    }

    trigger(); // still need trigger
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
            <textarea {...register('content')} />

            <label>Answer</label>
            {qTypeValue === 'single' && <RadioGroup options={options} registed={register('answer')} />}
            {qTypeValue === 'multi' && <CheckGroup options={options} registed={register('answer')} />}

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
