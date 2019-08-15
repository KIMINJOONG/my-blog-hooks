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
import { JOIN_USER_FAILURE, JOIN_USER_REQUEST, JOIN_USER_SUCCESS, LOGIN_REUQEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, USER_DETAIL_FAILURE, USER_DETAIL_SUCCESS, USER_DETAIL_REQUEST } from '../reducers/user';
import axios from 'axios';
import cookie from 'react-cookies';

function joinAPI(joinData) {
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

function loginAPI(loginData) {
    return axios.post('/user/login', loginData, {
        withCredentials: true
    });
}

function* login(action) {
    try{
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOGIN_SUCCESS,
            data: result.data
        });
    }catch(error) {
        yield put({
            type: LOGIN_FAILURE,
            error
        });
    }
}

function* watchLogin(){
    yield takeEvery(LOGIN_REUQEST, login);
}

function logoutAPI() {
    return axios.post('/user/logout',{}, {
        withCredentials: true,
        headers: {
            'token' : cookie.load('token') || ''
        },
    });
}

function* logout() {
    try{
        yield call(logoutAPI);
        yield put({
            type: LOGOUT_SUCCESS,
        });
    }catch(error) {
        yield put({
            type: LOGOUT_FAILURE,
            error
        });
    }
}

function* watchLogout(){
    yield takeLatest(LOGOUT_REQUEST, logout);
}


function userDetailAPI(loginData) {
    return axios.post('/user/detail', {}, {
        withCredentials: true
    });
}

function* userDetail(action) {
    try{
        const result = yield call(userDetailAPI);
        yield put({
            type: USER_DETAIL_SUCCESS,
            data: result.data
        });
    }catch(error) {
        yield put({
            type: USER_DETAIL_FAILURE,
            error
        });
    }
}

function* watchUserDetail(){
    yield takeLatest(USER_DETAIL_REQUEST, userDetail);
}

export default function* userSaga() {
    yield all([
        fork(watchJoin),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchUserDetail)
    ])
}