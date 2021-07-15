import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { HomepageSliceState } from './types';

export const initialState: HomepageSliceState = {
  colorArr: {},
};

const slice = createSlice({
  name: 'homepageSlice',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<any>) {
      state.colorArr = action.payload;
    },
  },
});

export const { actions: homepageSliceActions } = slice;

export const useHomepageSliceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};


/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomepageSliceSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */