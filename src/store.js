import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});
export const { setEmail } = userSlice.actions;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
