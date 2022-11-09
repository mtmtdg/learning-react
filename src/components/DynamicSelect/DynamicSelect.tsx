import styles from './DynamicSelect.module.css';

interface DynamicSelectProps {
  qType: 'single' | 'multi';
  content: string;
}

export default function DynamicSelect({ qType, content }: DynamicSelectProps) {
  const options = content.split('\n');
  switch (qType) {
    case 'single':
      return (
        <select>
          {options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </select>
      );
    case 'multi':
      return null;
  }
}
