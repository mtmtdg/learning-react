import { KeyboardEvent } from 'react';
import { Keydown } from '../../shared/Keydown';
import styles from './Home.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  /* 更喜欢do1,do2这种方式*/
  const do1 = (e: KeyboardEvent) => console.log('test', e.key, e.code, e.altKey, e.metaKey, e.ctrlKey, e.shiftKey);
  const do2 = () => console.log('test2');

  /* do3,do4这种方式只能在看到函数定义时发现这个函数有什么用,与原本的 (keydown.enter)="do3" 方式相差太远 */
  const do3 = Keydown.enter.then((e: KeyboardEvent) => console.log('test3', e));
  const do4 = Keydown.enter.then(() => console.log('test4'));
  return (
    <div className={styles.Home}>
      <div>Home works!</div>
      <input onKeyDown={Keydown.enter.then(do1)} />
      <input onKeyDown={Keydown.enter.ctrl.then(do2)} />
      <input onKeyDown={do3} />
      <input onKeyDown={do4} />
    </div>
  );
}
