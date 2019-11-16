import produce from 'immer';

export const initialState = {
  boards: [], // 게시글 리스트
  totalCount: 0,
  imagePaths: [], // 미리보기 이미지 경로
  boardDetail: null,
  isUpload: false,
  isModify: false,
  videoPath: '',
};

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST';
export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS';
export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const SEARCH_BOARD_LIST_REQUEST = 'SEARCH_BOARD_LIST_REQUEST';
export const SEARCH_BOARD_LIST_SUCCESS = 'SEARCH_BOARD_LIST_SUCCESS';
export const SEARCH_BOARD_LIST_FAILURE = 'SEARCH_BOARD_LIST_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case REMOVE_IMAGE_REQUEST: {
        break;
      }
      case REMOVE_IMAGE_SUCCESS: {
        if (draft.boardDetail) {
          const index = draft.boardDetail.images.findIndex(
            (v, i) => i === action.data.index,
          );
          draft.boardDetail.images.splice(index, 1);
        }
        const index = draft.imagePaths.findIndex(
          (v, i) => i === action.data.index,
        );
        draft.imagePaths.splice(index, 1);
        break;
      }
      case REMOVE_IMAGE_FAILURE: {
        break;
      }
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1);
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths.push(action.data);
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
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
        draft.boards = action.data.boards;
        draft.totalCount = action.data.totalCount;
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
      case ADD_COMMENT_REQUEST: {
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.boardDetail = action.data;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        break;
      }
      case SEARCH_BOARD_LIST_REQUEST: {
        break;
      }
      case SEARCH_BOARD_LIST_SUCCESS: {
        draft.boards.push(action.data);
        break;
      }
      case SEARCH_BOARD_LIST_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
