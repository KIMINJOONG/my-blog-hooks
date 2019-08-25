import { all, call } from 'redux-saga/effects';
import user from './user';
import board from './board';
import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-54-180-128-126.ap-northeast-2.compute.amazonaws.com:4000';

export default function* rootSaga() {
    yield all([call(user), call(board)]);
};