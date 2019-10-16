import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_BOARD_LIST_SUCCESS, LOAD_BOARD_LIST_FAILURE, LOAD_BOARD_LIST_REQUEST } from '../reducers/board';

function loadBoardAPI(data) {
    return axios.get(`boards/${data.categoryId}?searchValue=${encodeURI(data.searchValue)}&page=${data.page}&pageNum=${data.pageNum}`, {
        withCredentials: true,
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

export default function* boardsSaga() {
    yield all([
        fork(watchLoadBoards),
    ]);
}