import produce from 'immer';

export const initialState = {
    boards: [], // 게시글 리스트
    imagePaths: [], // 미리보기 이미지 경로
    boardDetail: null,
};

export const LOAD_BOARD_LIST_REQUEST = 'LOAD_BOARD_LIST_REQUEST';
export const LOAD_BOARD_LIST_SUCCESS = 'LOAD_BOARD_LIST_SUCCESS';
export const LOAD_BOARD_LIST_FAILURE = 'LOAD_BOARD_LIST_FAILURE';

export const UPLOAD_BOARD_REQUEST = 'UPLOAD_BOARD_REQUEST';
export const UPLOAD_BOARD_SUCCESS = 'UPLOAD_BOARD_SUCCESS';
export const UPLOAD_BOARD_FAILURE = 'UPLOAD_BOARD_FAILURE';


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_BOARD_LIST_REQUEST: {
                break;
            }
            case LOAD_BOARD_LIST_SUCCESS: {
                draft.boards = action.data;
                break;
            }
            case LOAD_BOARD_LIST_FAILURE: {
                break;
            }
            case UPLOAD_BOARD_REQUEST: {
                break;
            }
            case UPLOAD_BOARD_SUCCESS: {
                draft.boards.push(action.data);
                break;
            }
            case UPLOAD_BOARD_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}

export default reducer;