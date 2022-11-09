import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './RadioGroup.module.css';

interface RadioGroupProps {
  options: string[];
  registed: UseFormRegisterReturn;
}

export default function RadioGroup({ options, registed }: RadioGroupProps) {
  return (
    <div className={styles.RadioGroup}>
      {options.map((option, i) => (
        <label key={i}>
          <input style={{ display: 'inline' }} type="radio" value={i} {...registed} />
          {option}
        </label>
      ))}
    </div>
  );
}
