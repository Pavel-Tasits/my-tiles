import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.homepageSlice || initialState;

export const selectTileClicked = createSelector(
  [selectSlice],
  state => state.tileClicked,
);

export const selectComparedIdArr = createSelector(
  [selectSlice],
  state => state.comparedIdArr,
);
