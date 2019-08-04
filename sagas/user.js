import {
    all,
    fork,
    takeLatest,
    takeEvery,
    call,
    put,
    take,
    delay
} from 'redux-saga/effects';
import { JOIN_USER_FAILURE, JOIN_USER_REQUEST, JOIN_USER_SUCCESS } from '../reducers/user';
import axios from 'axios';

function joinAPI(joinData) {
    console.log('join : ', joinData);
    return axios.post('/user/join', joinData, {
        withCredentials: true
    });
}

function* join(action) {
    try{
        const result = yield call(joinAPI, action.data);
        yield put({
            type: JOIN_USER_SUCCESS,
            data: result.data
        });
    }catch(error) {
        yield put({
            type: JOIN_USER_FAILURE,
            error
        });
    }
}

function* watchJoin(){
    yield takeLatest(JOIN_USER_REQUEST, join);
}

export default function* userSaga() {
    yield all([
        fork(watchJoin)
    ])
}