import { all, call } from 'redux-saga/effects';
import user from './user';
import board from './board';
import boards from './boards';
import axios from 'axios';

const baseURL = (process.env.NODE_ENV === "production" ? 'https://api.kohubi.me/api' : 'http://localhost:4000/api');
// axios.defaults.baseURL = 'http://kohubi.me:4000';
// axios.defaults.baseURL = process.env.DEV_SERVER;
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = baseURL;
// axios.defaults.baseURL = process.env.NODE_ENV === "production" ? 'http://kohubi.me:4000' : 'http://localhost:4000';

export default function* rootSaga() {
    yield all([call(user), call(board)], call(boards));
};