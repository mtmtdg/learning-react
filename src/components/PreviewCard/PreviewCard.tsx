import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { Question } from '../../models';

interface PreviewCardProps {
  index: number;
  question: Question;
  handleDelete: (id: number) => void;
}

export default function PreviewCard({ index, question, handleDelete }: PreviewCardProps) {
  const options = question.content.split('\n').filter(x => x);

  function isRight(i: number): boolean {
    if (question.qType === 'single') {
      return (question.answer as any) == i;
    }
    return (question.answer as string[]).map(x => +x).includes(i);
  }

  return (
    <Card sx={{ border: '1rem solid', margin: '10px' }}>
      <CardHeader title={`Question ${index + 1}`} />

      <CardContent>
        <h5>{question.title}</h5>
        <div>{JSON.stringify(question)}</div>
        {options.map((option, i) => (
          <label key={i} style={{ display: 'block' }}>
            <input type={question.qType === 'single' ? 'radio' : 'checkbox'} value={i} checked={isRight(i)} readOnly />
            {option}
          </label>
        ))}
        <div>{question.analysis}</div>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <button onClick={() => handleDelete(question.id)}>delete</button>
      </CardActions>
    </Card>
  );
}
