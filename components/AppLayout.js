import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

const Container = styled.div`
    width: 80%;
    height: auto;
    margin: 0 auto;
`;
const Header = styled.header`
    width: 100%;
    height: 90px;
    cursor: pointer;
     & p {
         font-size: 1.3rem;
         text-align: center;
         line-height: 90px;
         color: #707070;
         margin: 0px;
     }
`;

const Side = styled.aside`
    float: left;
    width: 20%;
    height: 600px;

    & ul {
        margin: 0px;
        padding: 0px;
    }
    & li {
        margin-top: 10px;
        margin-left: 10px;
        list-style: none;
        cursor: pointer;
    }
`;

const Content = styled.section`
    float: right;
    width: 80%;
    height: 600px;
`;

const AppLayout = ({ children }) => {
    return (
        <Container>
            <Header onClick={() => Router.push('/')}>
                <p>KOHUBI'S BLOG</p>
            </Header>
            <Side>
                <h3>category</h3>
                <ul>
                    <li onClick={() => Router.push('/boards')}>Today I Learned</li>
                </ul>
            </Side>
            <Content>
                {children}
            </Content>
            
        </Container>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;