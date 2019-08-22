import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga'; // 서버사이드렌더링시 필수
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import AppLayout from "../components/AppLayout";
import rootSaga from '../sagas';
import createSagaMiddleware from "@redux-saga/core";
import Helmet from 'react-helmet';
import { Container } from 'next/app';
import axios from 'axios';
import { USER_DETAIL_REQUEST } from '../reducers/user';

const myBlog = ({ Component, store, pageProps }) => {
    return (
        <Container>
            <Provider store={store}>
                <Helmet
                    title="kohubi's blog"
                    htmlAttributes= {{ lang: 'ko'}}
                >
                </Helmet>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </Provider>
        </Container>
    );
};

myBlog.getInitialProps = async(context) => {
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.hesaders : '';
    axios.defaults.headers = '';
    if (ctx.isServer && cookie) {
        axios.defaults.headers = cookie;
    }
    if (!state.user.me) {
        ctx.store.dispatch({
          type: USER_DETAIL_REQUEST,
        });
      }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx) || {};
    }
    return { pageProps };
}



const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer =
      process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer &&
              window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
              ? window.__REDUX_DEVTOOLS_EXTENSION__()
              : f => f
          );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga); // 이부분도 서버사이드 렌더링
    return store;
  };
  
  export default withRedux(configureStore)(withReduxSaga(myBlog)); //서버사이드 렌더링 withReduxSaga추가