import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { HomepageSliceState } from './types';

export const initialState: HomepageSliceState = {
  tileClicked: [],
};

const slice = createSlice({
  name: 'homepageSlice',
  initialState,
  reducers: {
    setTileClicked(state, action: PayloadAction<any>) {
      state?.tileClicked?.push(action.payload);
      /*if (state?.tileClicked?.length !== 0) {
        console.log('!=0')
        state?.tileClicked?.map(item => {
          if (item.id !== action.payload.id) {
            console.log('item.id', item.id)
            console.log('action.payload.id', action.payload.id)
            state?.tileClicked?.push(action.payload);
          }
        })
      } else {
        console.log('=0')
        state?.tileClicked?.push(action.payload);
      }*/
    //console.log('state', state)
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