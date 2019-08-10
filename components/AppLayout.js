import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    height: 124px;
    border-bottom: 1px solid #707070;
`;

const Logo = styled.span`
    width: 400px;
    height: 124px;
    font-family: SegoeUI;
    font-size: 100px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #707070;s
`;

const AppLayout = ({ children }) => {
    return (
        <div>
            <Header>
                <Link href="/">
                    <Logo>DRINKER</Logo>
                </Link>
            </Header>
            <div>
                {children}
            </div>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;