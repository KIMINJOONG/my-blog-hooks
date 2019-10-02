import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyBlog extends Document {
    static getInitialProps(context) {
      const sheet = new ServerStyleSheet();
      const page = context.renderPage((App) => (props) => sheet.collectStyles(<App { ...props }/>));
      const styleTags = sheet.getStyleElement();
      return { ...page, styleTags };
    }
  
    render() {
      return (
        <html>
          <Head>
            {this.props.styleTags}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  }