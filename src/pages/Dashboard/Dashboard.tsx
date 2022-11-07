import styles from "./Dashboard.module.css";

interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.Dashboard}>
      Dashboard works!
      <div></div>
    </div>
  );
}
