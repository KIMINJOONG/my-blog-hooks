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
import axios from 'axios';
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



export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
  })(myBlog);