import { createSlice } from '@reduxjs/toolkit';

interface IbgeProps {
  state: null | string;
  city: null | string;
}

const INITIAL_STATE: IbgeProps = { state: null, city: null };

const sliceIbge = createSlice({
  name: 'ibge',
  initialState: INITIAL_STATE,
  reducers: {
    addInfos(state, action) {
      return { state: action.payload.state, city: action.payload.city };
    }
  }
});

export default sliceIbge.reducer;
export const { addInfos } = sliceIbge.actions;

export const useIbge = (state: any) => {
  return state.ibge as IbgeProps;
};
