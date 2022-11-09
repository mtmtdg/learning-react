import { useState } from 'react';
import './App.css';
import QuestionMeta from './components/QuestionMeta/QuestionMeta';
import { Question } from './models';

function App() {
  const emptyQuestion: Question = { title: 'title here', qType: 'multi', content: '1\n2', answer: ['0', '1'] };

  const [currentQuestion, setCurrentQuestion] = useState<Question>(emptyQuestion);
  return (
    <div className="App">
      <QuestionMeta question={currentQuestion} setQuestion={setCurrentQuestion} />
      <div>{JSON.stringify(currentQuestion)}</div>
    </div>
  );
}

export default App;
