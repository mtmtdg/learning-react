import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import './App.css';
import PreviewCard from './components/PreviewCard/PreviewCard';
import QuestionMeta from './components/QuestionMeta/QuestionMeta';
import { Question } from './models';

const emptyQuestion: Question = { id: 0, title: '', qType: 'single', content: '', answer: null };

function App() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'Where', qType: 'multi', content: '1\n2', answer: ['0', '1'] },
    { id: 2, title: 'When', qType: 'single', content: '1\n2', answer: '1' },
    { id: 3, title: 'Who', qType: 'multi', content: '1\n2', answer: ['0'] },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  const addOne = () => {
    const newQ = { ...emptyQuestion };
    setQuestions([...questions, newQ]);
    setCurrentQuestion(newQ);
  };

  useEffect(() => {
    if (!currentQuestion) return;
    const target = questions.find(question => question.id === currentQuestion.id);
    if (!!target) {
      Object.assign(target, currentQuestion);
      setQuestions([...questions]);
    }
  }, [currentQuestion]);

  const _deleteById = (id: number) => {
    const temp = questions.filter(q => q.id !== id);
    setQuestions(temp);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ maxWidth: '500px' }}>
        {/* ReactSortable<T extends ItemInterface>
         * interface ItemInterface {id: string|number, selected?, chosen?, filtered?, any}
         */}
        <ReactSortable list={questions} setList={setQuestions}>
          {questions.map((question, i) => (
            <div key={i} onClick={() => setCurrentQuestion(question)}>
              <PreviewCard index={i} question={question} handleDelete={_deleteById} />
            </div>
          ))}
        </ReactSortable>
        <div>current: {JSON.stringify(currentQuestion)}</div>
        <div>all: {JSON.stringify(questions)}</div>
      </div>

      <div>
        <button onClick={() => addOne()}>add empty</button>
        <QuestionMeta question={currentQuestion} setQuestion={setCurrentQuestion} />
      </div>
    </div>
  );
}

export default App;
