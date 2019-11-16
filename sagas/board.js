import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  UPLOAD_BOARD_REQUEST,
  UPLOAD_BOARD_FAILURE,
  UPLOAD_BOARD_SUCCESS,
  LOAD_BOARD_DETAIL_REQUEST,
  LOAD_BOARD_DETAIL_SUCCESS,
  LOAD_BOARD_DETAIL_FAILURE,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  MODIFY_BOARD_SUCCESS,
  MODIFY_BOARD_FAILURE,
  MODIFY_BOARD_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  SEARCH_BOARD_LIST_SUCCESS,
  SEARCH_BOARD_LIST_FAILURE,
  SEARCH_BOARD_LIST_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_FAILURE,
  REMOVE_IMAGE_SUCCESS,
  LOAD_BOARD_LIST_SUCCESS,
  LOAD_BOARD_LIST_FAILURE,
  LOAD_BOARD_LIST_REQUEST,
} from '../reducers/board';
import axios from 'axios';

// function loadBoardAPI(data) {
//     return axios.get(`boards/${data.categoryId}?searchValue=${encodeURI(data.searchValue)}&page=${data.page}&pageNum=${data.pageNum}`, {
//         withCredentials: true,
//     });
// }

// function* loadBoard(action) {
//     try {
//         const result = yield call(loadBoardAPI, action.data);
//         yield put({
//             type: LOAD_BOARD_LIST_SUCCESS,
//             data: result.data
//         });
//     }catch(error) {
//         yield put({
//             type: LOAD_BOARD_LIST_FAILURE,
//             error
//         });
//     }
// }

// function* watchLoadBoards(){
//     yield takeLatest(LOAD_BOARD_LIST_REQUEST,loadBoard);
// }

function uploadBoardAPI(uploadBoardData) {
  return axios.post('/board', uploadBoardData, {
    withCredentials: true,
  });
}

function* uploadBoard(action) {
  try {
    const result = yield call(uploadBoardAPI, action.data);
    yield put({
      type: UPLOAD_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: UPLOAD_BOARD_FAILURE,
      error,
    });
  }
}

function* watchUploadBoard() {
  yield takeLatest(UPLOAD_BOARD_REQUEST, uploadBoard);
}

function modifyBoardAPI(modifyBoardData) {
  return axios.put(`/board/${modifyBoardData.boardId}`, modifyBoardData, {
    withCredentials: true,
  });
}

function* modifyBoard(action) {
  try {
    const result = yield call(modifyBoardAPI, action.data);
    yield put({
      type: MODIFY_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: MODIFY_BOARD_FAILURE,
      error,
    });
  }
}

function* watchModifyBoard() {
  yield takeLatest(MODIFY_BOARD_REQUEST, modifyBoard);
}

function loadBoardDetailAPI(boardId) {
  return axios.get(`/board/${boardId}`);
}

function* loadBoardDetail(action) {
  try {
    const result = yield call(loadBoardDetailAPI, action.data);
    yield put({
      type: LOAD_BOARD_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: LOAD_BOARD_DETAIL_FAILURE,
      error,
    });
  }
}

function* watchLoadBoardDetail() {
  yield takeLatest(LOAD_BOARD_DETAIL_REQUEST, loadBoardDetail);
}

function deleteBoardAPI(boardId) {
  return axios.delete(`/board/${boardId}`, {
    withCredentials: true,
  });
}

function* deleteBoard(action) {
  try {
    const result = yield call(deleteBoardAPI, action.data);
    yield put({
      type: DELETE_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: DELETE_BOARD_FAILURE,
      error,
    });
  }
}

function* watchDeleteBoard() {
  yield takeLatest(DELETE_BOARD_REQUEST, deleteBoard);
}

function addCommentAPI(commentData) {
  return axios.post(`/board/${commentData.boardId}/comment`, commentData, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function uploadImagesAPI(formData) {
  return axios.post('/board/images', formData, {
    withCredentials: true,
  });
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data, // 서버쪽에서 저장된 주소를 리턴받을 예정
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function removeImageAPI(data) {
  return axios.delete(`/board/image/${data.fileName}`, {
    withCredentials: true,
  });
}

function* removeImage(action) {
  try {
    const result = yield call(removeImageAPI, action.data);
    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: REMOVE_IMAGE_FAILURE,
      error,
    });
  }
}

function* watchRemoveImage() {
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImage);
}

export default function* boardSaga() {
  yield all([
    fork(watchUploadBoard),
    fork(watchLoadBoardDetail),
    fork(watchDeleteBoard),
    fork(watchModifyBoard),
    fork(watchAddComment),
    fork(watchUploadImages),
    fork(watchRemoveImage),
  ]);
}
