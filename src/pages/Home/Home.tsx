import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/helpers/hooks';
import { selectIsAdmin } from '../../redux/slices/commonSlice';
import styles from './Home.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  const navigate = useNavigate();
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <div className={styles.Home}>
      Home works!
      <button onClick={() => navigate('/admin/dashboard')}>goto dashboard (admin required)</button>
      {isAdmin ? <div> only admin can see this</div> : null}
    </div>
  );
}
