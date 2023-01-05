import { createSlice } from '@reduxjs/toolkit';

interface LanguagesProps {
  state: string;
  city: string;
}

const INITIAL_STATE: LanguagesProps[] = [{ state: '', city: '' }];

const sliceLanguages = createSlice({
  name: 'languages',
  initialState: INITIAL_STATE,
  reducers: {
    addLanguages(state, action) {
      return [{ state: action.payload.state, city: action.payload.city }];
    }
  }
});

export default sliceLanguages.reducer;
export const { addLanguages } = sliceLanguages.actions;

export const useLanguages = (state: any) => {
  return state.languages as LanguagesProps[];
};
