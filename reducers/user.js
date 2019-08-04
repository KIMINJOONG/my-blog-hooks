import produce from 'immer';

export const initialState = {
    userInfo: null
};

export const JOIN_USER_REQUEST = 'JOIN_USER_REQUEST';
export const JOIN_USER_SUCCESS = 'JOIN_USER_SUCCESS';
export const JOIN_USER_FAILURE = 'JOIN_USER_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case JOIN_USER_REQUEST: {
                break;
            }
            case JOIN_USER_SUCCESS: {
                break;
            }
            case JOIN_USER_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default reducer;