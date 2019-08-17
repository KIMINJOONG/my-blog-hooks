import produce from 'immer';

export const initialState = {
    boards: [], // 게시글 리스트
    imagePaths: [], // 미리보기 이미지 경로
    boardDetail: null,
    isUpload: false,
    isModify: false,
};

export const MODIFY_BOARD_REQUEST = 'MODIFY_BOARD_REQUEST';
export const MODIFY_BOARD_SUCCESS = 'MODIFY_BOARD_SUCCESS';
export const MODIFY_BOARD_FAILURE = 'MODIFY_BOARD_FAILURE';

export const LOAD_BOARD_DETAIL_REQUEST = 'LOAD_BOARD_DETAIL_REQUEST';
export const LOAD_BOARD_DETAIL_SUCCESS = 'LOAD_BOARD_DETAIL_SUCCESS';
export const LOAD_BOARD_DETAIL_FAILURE = 'LOAD_BOARD_DETAIL_FAILURE';

export const LOAD_BOARD_LIST_REQUEST = 'LOAD_BOARD_LIST_REQUEST';
export const LOAD_BOARD_LIST_SUCCESS = 'LOAD_BOARD_LIST_SUCCESS';
export const LOAD_BOARD_LIST_FAILURE = 'LOAD_BOARD_LIST_FAILURE';

export const UPLOAD_BOARD_REQUEST = 'UPLOAD_BOARD_REQUEST';
export const UPLOAD_BOARD_SUCCESS = 'UPLOAD_BOARD_SUCCESS';
export const UPLOAD_BOARD_FAILURE = 'UPLOAD_BOARD_FAILURE';

export const DELETE_BOARD_REQUEST = 'DELETE_BOARD_REQUEST';
export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS';
export const DELETE_BOARD_FAILURE = 'DELETE_BOARD_FAILURE';


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_BOARD_DETAIL_REQUEST: {
                break;
            }
            case LOAD_BOARD_DETAIL_SUCCESS: {
                draft.boardDetail = action.data;
                break;
            }
            case LOAD_BOARD_DETAIL_FAILURE: {
                break;
            }
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
                draft.isUpload = true;
                draft.boards.push(action.data);
                break;
            }
            case UPLOAD_BOARD_FAILURE: {
                break;
            }
            case DELETE_BOARD_REQUEST: {
                break;
            }
            case DELETE_BOARD_SUCCESS: {
                break;
            }
            case DELETE_BOARD_FAILURE: {
                break;
            }
            case MODIFY_BOARD_REQUEST: {
                break;
            }
            case MODIFY_BOARD_SUCCESS: {
                draft.isModify = true;
                break;
            }
            case MODIFY_BOARD_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}

export default reducer;