import styles from './Home.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.Home}>
      <div>Home works!</div>
    </div>
  );
}
