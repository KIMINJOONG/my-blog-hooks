import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_BOARD_LIST_REQUEST, LOAD_BOARD_LIST_SUCCESS, LOAD_BOARD_LIST_FAILURE, UPLOAD_BOARD_REQUEST, UPLOAD_BOARD_FAILURE, UPLOAD_BOARD_SUCCESS } from '../reducers/board';
import axios from 'axios';
import Router from "next/router";

function loadBoardAPI() {
    return axios.get('board/list', {
        withCredentials: true
    });
}

function* loadBoard() {
    try {
        const result = yield call(loadBoardAPI);
        yield put({
            type: LOAD_BOARD_LIST_SUCCESS,
            data: result.data
        });
        Router.push('/boardList');
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
    return axios.post('/board/upload', uploadBoardData, {
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

export default function* boardSaga() {
    yield all([
        fork(watchLoadBoards),
        fork(watchUploadBoard),
    ]);
}