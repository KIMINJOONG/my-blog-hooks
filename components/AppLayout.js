import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LOGOUT_REQUEST } from '../reducers/user';
import Router from 'next/router';

const Header = styled.div`
    width: 100%;
    border-bottom: 1px solid #707070;
    margin-bottom: 10px;

    & > div {
        display: inline-block;
        height: 80px;
        line-height: 80px;
    }

    & .logo {
        width: 40%;
    }

    & .menu {
        width: 60%;
    }

    & .menu > ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    & .menu > ul > li {
        font-size: 20px;
        display: inline-block;
        width: 20%;
        text-align: center;
        color: #707070;
        cursor: pointer;
    }
`;

const Logo = styled.span`
    font-size: 4rem;
    font-family: SegoeUI;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
`;

const Content = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const AppLayout = ({ children }) => {
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    }, []);
    return (
            <div>
                <Header>
                    <div className="logo">
                        <Link href="/">
                            <Logo>DRINKER</Logo>
                        </Link>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>주변제휴점</li>
                            <li>이용방법</li>
                            <li>고객센터</li>
                            <li>공지사항</li>
                            {userInfo ? <li onClick={onLogout}>로그아웃</li> : <li onClick={() => Router.push('/login')}>로그인</li>}
                        </ul>
                    </div>
                </Header>
            <Content>
                {children}
            </Content>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;