import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts';

export type TUserInitialState = {
 authorizationStatus: AuthorizationStatus;
}

const initialState: TUserInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
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
