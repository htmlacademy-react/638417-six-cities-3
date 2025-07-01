import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts';

export type TUserInitialState = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: TUserInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    }
  }
});

export const { setAuthorization } = userSlice.actions;
export default userSlice;
