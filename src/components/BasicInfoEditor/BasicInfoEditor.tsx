import { BaseSyntheticEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { BasicInfo } from '../../models';
import styles from './BasicInfoEditor.module.css';

interface BasicInfoEditorProps {
  basicInfo: BasicInfo;
  setBasicInfo: Dispatch<SetStateAction<BasicInfo>>;
}

export default function BasicInfoEditor({ basicInfo, setBasicInfo }: BasicInfoEditorProps) {
  const handleChange = (e: BaseSyntheticEvent) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.BasicInfoEditor}>
      <div>
        <label>title</label>
        <input name="title" defaultValue={basicInfo.title} onChange={handleChange} />
      </div>

      <div>
        <label>message</label>
        <input name="message" defaultValue={basicInfo.message} onChange={handleChange} />
      </div>
    </div>
  );
}
