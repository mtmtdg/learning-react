import styles from "./Error.module.css";

interface ErrorProps {}

export default function Error(props: ErrorProps) {
  return (
    <div className={styles.Error}>
      Error works!
      <div></div>
    </div>
  );
}
