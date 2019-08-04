import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import AppLayout from "../components/AppLayout";
import rootSaga from '../sagas';
import createSagaMiddleware from "@redux-saga/core";
import Helmet from 'react-helmet';
import { Container } from 'next/app';

const myBlog = ({ Component, store, }) => {
    return (
        <Container>
            <Provider store={store}>
                <Helmet
                    title="kohubi's blog"
                    htmlAttributes= {{ lang: 'ko'}}
                >
                </Helmet>
                <AppLayout>
                    <Component />
                </AppLayout>
            </Provider>
        </Container>
    );
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
    sagaMiddleware.run(rootSaga);
    return store;
  };
  
  export default withRedux(configureStore)(myBlog); //서버사이드 렌더링 withReduxSaga추가