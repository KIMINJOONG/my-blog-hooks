import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_BOARD_LIST_REQUEST, LOAD_BOARD_LIST_SUCCESS, LOAD_BOARD_LIST_FAILURE } from '../reducers/board';

function loadBoardAPI() {

}

function* loadBoard() {
    try {
        const result = yield call(loadBoardAPI);
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

export default function* boardSaga() {
    yield all([
        fork(watchLoadBoards)
    ]);
}