import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_BOARD_LIST_REQUEST, LOAD_BOARD_LIST_SUCCESS, LOAD_BOARD_LIST_FAILURE, UPLOAD_BOARD_REQUEST, UPLOAD_BOARD_FAILURE, UPLOAD_BOARD_SUCCESS, LOAD_BOARD_DETAIL_REQUEST, LOAD_BOARD_DETAIL_SUCCESS, LOAD_BOARD_DETAIL_FAILURE, DELETE_BOARD_SUCCESS, DELETE_BOARD_FAILURE, DELETE_BOARD_REQUEST, MODIFY_BOARD_SUCCESS, MODIFY_BOARD_FAILURE, MODIFY_BOARD_REQUEST, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS, SEARCH_BOARD_LIST_SUCCESS, SEARCH_BOARD_LIST_FAILURE, SEARCH_BOARD_LIST_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST } from '../reducers/board';
import axios from 'axios';

function loadBoardAPI(searchValue) {
    return axios.get(`boards?searchValue=${searchValue}`, {
        withCredentials: true
    });
}

function* loadBoard(action) {
    try {
        const result = yield call(loadBoardAPI, action.data);
        yield put({
            type: LOAD_BOARD_LIST_SUCCESS,
            data: result.data
        });
    }catch(error) {
        yield put({
            type: LOAD_BOARD_LIST_FAILURE,
            error
        });
    }
}

function* watchLoadBoards(){
    yield takeLatest(LOAD_BOARD_LIST_REQUEST,loadBoard);
}

function uploadBoardAPI(uploadBoardData) {
    console.log(uploadBoardData);
    return axios.post('/boards', uploadBoardData, {
        withCredentials: true
    });
}

function* uploadBoard(action) {
    try{
        const result = yield call(uploadBoardAPI, action.data);
        yield put({
            type: UPLOAD_BOARD_SUCCESS,
            data: result.data
        })

    }catch(error){
        console.log('error' ,error);
        yield put({
            type: UPLOAD_BOARD_FAILURE,
            error
        })
    }
}

function* watchUploadBoard() {
    yield takeLatest(UPLOAD_BOARD_REQUEST ,uploadBoard);
}




function modifyBoardAPI(modifyBoardData) {
    return axios.put(`/boards/${modifyBoardData.boardId}`, modifyBoardData, {
        withCredentials: true
    });
}

function* modifyBoard(action) {
    try{
        const result = yield call(modifyBoardAPI, action.data);
        yield put({
            type: MODIFY_BOARD_SUCCESS,
            data: result.data
        })

    }catch(error){
        console.log('error' ,error);
        yield put({
            type: MODIFY_BOARD_FAILURE,
            error
        })
    }
}

function* watchModifyBoard() {
    yield takeLatest(MODIFY_BOARD_REQUEST ,modifyBoard);
}



function loadBoardDetailAPI(boardId) {
    return axios.get(`/boards/${boardId}`);
}

function* loadBoardDetail(action) {
    try{
        const result = yield call(loadBoardDetailAPI, action.data);
        yield put({
            type: LOAD_BOARD_DETAIL_SUCCESS,
            data: result.data
        })

    }catch(error){
        console.log('error' ,error);
        yield put({
            type: LOAD_BOARD_DETAIL_FAILURE,
            error
        })
    }
}

function* watchLoadBoardDetail() {
    yield takeLatest(LOAD_BOARD_DETAIL_REQUEST ,loadBoardDetail);
}

function deleteBoardAPI(boardId) {
    return axios.delete(`/boards/${boardId}`, {
        withCredentials: true
    });
}

function* deleteBoard(action) {
    try{
        const result = yield call(deleteBoardAPI, action.data);
        yield put({
            type: DELETE_BOARD_SUCCESS,
            data: result.data
        })

    }catch(error){
        console.log('error' ,error);
        yield put({
            type: DELETE_BOARD_FAILURE,
            error
        })
    }
}

function* watchDeleteBoard() {
    yield takeLatest(DELETE_BOARD_REQUEST ,deleteBoard);
}



function addCommentAPI(commentData) {
    return axios.post(`/boards/${commentData.boardId}/comment`, commentData, {
        withCredentials: true
    });
}

function* addComment(action) {
    try{
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data
        });

    }catch(error){
        console.log('error' ,error);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error
        });
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST ,addComment);
}


function uploadImagesAPI(formData) {
    return axios.post('/boards/images', formData, {
      withCredentials: true
    });
  }
  function* uploadImages(action) {
    try {
      const result = yield call(uploadImagesAPI, action.data);
      yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data // 서버쪽에서 저장된 주소를 리턴받을 예정
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: UPLOAD_IMAGES_FAILURE,
        error: e
      });
    }
  }
  
  function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
  }

export default function* boardSaga() {
    yield all([
        fork(watchLoadBoards),
        fork(watchUploadBoard),
        fork(watchLoadBoardDetail),
        fork(watchDeleteBoard),
        fork(watchModifyBoard),
        fork(watchAddComment),
        fork(watchUploadImages)
    ]);
}