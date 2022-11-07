import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './types';

// a typed version of useDispatch
export const useAppDispatch = useDispatch<AppDispatch>;
// a typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
