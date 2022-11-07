import { AuthService } from '../../services/authService';
import styles from './Login.module.css';

export default function Login() {
  const login1 = () => {
    AuthService.login('username', 'password', true);
  };

  const login = () => {
    AuthService.login('username', 'password', false);
  };

  return (
    <div className={styles.Login}>
      Login works!
      <button onClick={login}>login as simple</button>
      <button onClick={login1}>login as admin</button>
    </div>
  );
}
