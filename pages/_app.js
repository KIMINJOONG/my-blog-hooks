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

const MyBlog = ({ Component, store, pageProps }) => {
    return (
        <Container>
            <Provider store={store}>
            <Helmet
              title="Kohubi's Blog"
              htmlAttributes={{ lang: 'ko' }}
              meta={[{
                charset: 'UTF-8',
                }, {
                  name: 'viewport',
                  content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                }, {
                  'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                }, {
                  name: 'description', content: 'kohubi 블로그',
                }, {
                  name: 'og:title', content: 'NodeBird',
                }, {
                  name: 'og:description', content: 'kohubi 블로그',
                }, {
                  property: 'og:type', content: 'website',
                }
              ]}
              link={[{
                rel: 'shortcut icon', href: '/favicon.ico',
                }, {
                  rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
                }, {
                  rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
                }, {
                  rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
                }
              ]}
            />
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </Provider>
        </Container>
    );
};

MyBlog.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  //axios.defaults.headers.Cookie = '';
  // Refused to set unsafe header "Cookie"
  // 이 부분은 클라이언트 사이드에서 쿠키를 세팅하려했을 때 나는 에러입니다. 서버사이드에서만 세팅할 수 있게 해야합니다.
  // 그래서 코드에서 if (option.isServer) { axios }로 감싸져 있습니다.
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
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
  
};
  
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
  
  export default withRedux(configureStore)(withReduxSaga(MyBlog)); //서버사이드 렌더링 withReduxSaga추가