/*
  Avoid using async actions inside redux 
 */
import { LoginService } from './http/loginService';
import { clearToken, setToken } from '../redux/slices/commonSlice';
import { store } from '../redux/store';

// hook version: useDispatch
// simple version: store.dispatch
const dispatch = store.dispatch;

async function login(username: string, password: string, isAdmin: boolean) {
  const res = await LoginService.login(username, password, isAdmin);
  if (!!res.data.token) {
    dispatch(setToken(res.data.token));
  } else {
    // TODO show errors
  }
}

async function logout() {
  // const res = await LoginService.logout();
  dispatch(clearToken());
}

export const AuthService = {
  login,
  logout,
};
