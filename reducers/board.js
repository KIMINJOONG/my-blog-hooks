import produce from 'immer';

export const initialState = {
    boardList: [], // 게시글 리스트
    imagePaths: [], // 미리보기 이미지 경로
    boardDetail: null,
};

export const LOAD_BOARD_LIST_REQUEST = 'LOAD_BOARD_LIST_REQUEST';
export const LOAD_BOARD_LIST_SUCCESS = 'LOAD_BOARD_LIST_SUCCESS';
export const LOAD_BOARD_LIST_FAILURE = 'LOAD_BOARD_LIST_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_BOARD_LIST_REQUEST: {
                break;
            }
            case LOAD_BOARD_LIST_SUCCESS: {
                console.log('성공');
                break;
            }
            case LOAD_BOARD_LIST_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    });
}

export default reducer;