import { all, call } from 'redux-saga/effects';
import user from './user';
import board from './board';
import axios from 'axios';

// axios.defaults.baseURL = 'http://kohubi.me:4000';
// axios.defaults.baseURL = process.env.DEV_SERVER;
axios.defaults.baseURL = 'http://localhost:4000';

export default function* rootSaga() {
    yield all([call(user), call(board)]);
};