import { ThemeText1, ThemeText2, ThemeText3, ThemeText4 } from '../../ThemeText';
import styles from './Home.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.Home}>
      <div>Home works!</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', width: '300px' }}>
        <ThemeText1>Styled div with theme</ThemeText1>
        <ThemeText2>Styled div with theme</ThemeText2>
        <ThemeText3>Styled div with theme</ThemeText3>
        <ThemeText4>Styled div with theme</ThemeText4>
      </div>
    </div>
  );
}
