import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../helpers/types';
import { decodeToken } from 'react-jwt';
import { JwtPayload } from '../../models';

export interface CommonState {
  token: string;
}

const initialState: CommonState = {
  token: '',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = '';
    },
  },
});
export const { setToken, clearToken } = commonSlice.actions;

const selectToken = (state: RootState) => state.common.token;
export const loggedIn = createSelector(selectToken, token => !!token);

const _selectTokenPayload = () => createSelector(selectToken, token => decodeToken<JwtPayload>(token));
export const selectTokenPayload = _selectTokenPayload();
export const selectUser = createSelector(_selectTokenPayload(), payload => payload?.user);
export const selectIsAdmin = createSelector(_selectTokenPayload(), payload => payload?.user.roleId === 9);
export const selectExp = createSelector(_selectTokenPayload(), payload => payload?.exp);
