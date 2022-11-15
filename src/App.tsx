import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import './App.css';
import BasicInfoEditor from './components/BasicInfoEditor/BasicInfoEditor';
import { FunctionItem, FunctionSwitcher } from './components/FunctionSwitcher';
import PreviewCard from './components/PreviewCard/PreviewCard';
import QuestionMeta from './components/QuestionMeta/QuestionMeta';
import { BasicInfo, Question } from './models';

const emptyQuestion: Question = { id: 0, title: '', qType: 'single', content: '', answer: null };
const mockQuestions: Question[] = [
  { id: 1, title: '<p>Where</p>', qType: 'multi', content: '1\n2', answer: ['0', '1'] },
  { id: 2, title: '<p>When</p>', qType: 'single', content: '1\n2', answer: '1' },
  { id: 3, title: '<p>Who</p>', qType: 'multi', content: '1\n2', answer: ['0'] },
];

function App() {
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    message: '',
  });
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(mockQuestions[0]);

  const addOne = () => {
    const newQ = { ...emptyQuestion };
    newQ.id = Math.max(...questions.map(q => q.id)) + 1;
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
      <div style={{ width: '500px' }}>
        <div>
          basic setting:
          <div>title: {basicInfo.title}</div>
          <div>help message: {basicInfo.message}</div>
        </div>
        {/* ReactSortable<T extends ItemInterface>
         * interface ItemInterface {id: string|number, selected?, chosen?, filtered?, any}
         */}
        <ReactSortable list={questions} setList={setQuestions}>
          {questions.map((question, i) => (
            <div key={i} onClick={() => setCurrentQuestion(question)}>
              <PreviewCard
                index={i}
                question={question}
                handleDelete={_deleteById}
                isSelected={currentQuestion?.id === question.id}
              />
            </div>
          ))}
        </ReactSortable>
      </div>

      <FunctionSwitcher>
        <FunctionItem
          key="basic setting"
          label="basic setting"
          element={<BasicInfoEditor basicInfo={basicInfo} setBasicInfo={setBasicInfo} />}
        />
        <FunctionItem
          key="question meta"
          label="question meta"
          element={
            <>
              <button onClick={() => addOne()}>add empty</button>
              <QuestionMeta question={currentQuestion} setQuestion={setCurrentQuestion} />
            </>
          }
        />
      </FunctionSwitcher>
    </div>
  );
}

export default App;
