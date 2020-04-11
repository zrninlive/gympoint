import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.token = action.payload.token;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        break;
      }

      default:
    }
  });
}
