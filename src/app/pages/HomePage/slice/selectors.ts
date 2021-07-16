import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.homepageSlice || initialState;

export const selectHomepageSlice = createSelector(
  [selectSlice],
  state => state.tileClicked,
);
