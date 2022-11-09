import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './CheckGroup.module.css';

interface CheckGroupProps {
  options: string[];
  registed: UseFormRegisterReturn;
}

export default function CheckGroup({ options, registed }: CheckGroupProps) {
  return (
    <div className={styles.CheckGroup}>
      {options.map((option, i) => (
        <label key={i}>
          <input style={{ display: 'inline' }} type="checkbox" value={i} {...registed} />
          {option}
        </label>
      ))}
    </div>
  );
}
