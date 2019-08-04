import produce from 'immer';

export const initialState = {
    userInfo: null,
    isJoin: false,
};

export const JOIN_USER_REQUEST = 'JOIN_USER_REQUEST';
export const JOIN_USER_SUCCESS = 'JOIN_USER_SUCCESS';
export const JOIN_USER_FAILURE = 'JOIN_USER_FAILURE';

export const joinUserAction = data => {
    return {
      type: JOIN_USER_REQUEST,
      data: data
    };
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
            default: {
                break;
            }
        }
    });
};

export default reducer;