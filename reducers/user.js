import produce from 'immer';

export const initialState = {
    userInfo: null,
    isJoin: false,
};

export const JOIN_USER_REQUEST = 'JOIN_USER_REQUEST';
export const JOIN_USER_SUCCESS = 'JOIN_USER_SUCCESS';
export const JOIN_USER_FAILURE = 'JOIN_USER_FAILURE';

export const LOGIN_REUQEST = 'LOGIN_REUQEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const USER_DETAIL_REQUEST = 'USER_DETAIL_REQUEST';
export const USER_DETAIL_SUCCESS = 'USER_DETAIL_SUCCESS';
export const USER_DETAIL_FAILURE = 'USER_DETAIL_FAILURE';

export const joinUserAction = data => {
    return {
      type: JOIN_USER_REQUEST,
      data: data
    };
};

export const loginAction = {
    type: LOGIN_REUQEST,
};


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case JOIN_USER_REQUEST: {
                draft.isJoin = false;
                break;
            }
            case JOIN_USER_SUCCESS: {
                draft.isJoin = true;
                break;
            }
            case JOIN_USER_FAILURE: {
                draft.isJoin = false;
                break;
            }
            case LOGIN_REUQEST: {
                draft.userInfo = null;
                break;
            }
            case LOGIN_SUCCESS: {
                draft.userInfo = action.data;
                break;
            }
            case LOGIN_FAILURE: {
                break;
            }
            case LOGOUT_REQUEST: {
                break;
            }
            case LOGOUT_SUCCESS: {
                draft.userInfo = null;
                break;
            }
            case LOGOUT_FAILURE: {
                break;
            }
            case USER_DETAIL_REQUEST: {
                break;
            }
            case USER_DETAIL_SUCCESS: {
                draft.userInfo = action.data
                break;
            }
            case USER_DETAIL_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default reducer;