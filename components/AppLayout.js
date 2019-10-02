import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router, {useRouter} from 'next/router';
import { LOGOUT_REQUEST } from '../reducers/user';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Container = styled.div`
    width: 80%;
    height: auto;
    margin: 0 auto;
`;
// const Header = styled.header`
//     width: 100%;
//     height: 90px;
//     cursor: pointer;
//      & .myHome {
//          line-height: 46px;
//          font-size: 1.3rem;
//          text-align: center;
//          color: #707070;
//          margin: 0px;
//      }

//      & > div > div {
//          text-align: right;
//          color: #707070;
//          cursor: pointer;
//      }
// `;

const Side = styled.aside`
    float: left;
    width: 20%;
    height: 600px;

    & ul {
        margin: 0px;
        padding: 0px;
    }
`;

const Item = styled.li`
    width: 60%;
    margin-top: 10px;
    margin-left: 10px;
    list-style: none;
    cursor: pointer;
    border-bottom: 1px solid 
        ${props => props.current ? "#3498db" : "transparent"};
    transition: border-bottom .5s ease-in-out;
    :hover {
        border-bottom: 1px solid #3498db;
    }
`;

// const Content = styled.section`
//     float: right;
//     width: 80%;
//     height: 600px;
// `;

const AppLayout = ({ children }) => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    }, []);
    const { userInfo } = useSelector(state => state.user);
    return (
        <Layout style={{height: '800px'}}>
            <Header style={{background:'white'}}>
                <Row>
                    <Col xs={23} md={23} onClick={() => Router.push('/')}>
                        KOHUBI'S BLOG
                    </Col>
                    <Col xs={1} md={1}>
                        {
                            userInfo ? (
                                <div onClick={ onLogout }>
                                    <span>로그아웃</span>
                                </div>
                            ) : (
                                
                                <Button type="primary" onClick={ () => Router.push('/login') }>
                                    로그인
                                </Button>
                            )
                        }
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Row style={{background:'white', height: '800px'}}>
                    <Col xs={24} md={2}>
                        <Item current={useRouter().query.categoryId === '1'} onClick={() => Router.push('/boards/1')}>일상</Item>
                        <Item current={useRouter().query.categoryId === '2'} onClick={() => Router.push('/boards/2')}>개발관련</Item>
                        <Item current={useRouter().query.categoryId === '3'} onClick={() => Router.push('/boards/3')}>My Video</Item>
                    </Col>
                    <Col xs={24} md={22}>
                        <Content>{children}</Content>
                    </Col>
                </Row>
                
            </Layout>
        </Layout>
        // <>
        // <Container>
        //     <Header>
        //         <div>
        //             <p className="myHome" onClick={() => Router.push('/')}>KOHUBI'S BLOG</p>
        //             {
        //                 userInfo ? (
        //                     <div onClick={ onLogout }>
        //                         <span>로그아웃</span>
        //                     </div>
        //                 ) : (
                            
        //                     <div onClick={ () => Router.push('/login') }>
        //                         <span>로그인</span>
        //                     </div>
        //                 )
        //             }
                    
        //         </div>
        //     </Header>
        //     <Side>
        //         <h3>category</h3>
        //         <ul>
        //             <Item current={useRouter().query.categoryId === '1'} onClick={() => Router.push('/boards/1')}>일상</Item>
        //             <Item current={useRouter().query.categoryId === '2'} onClick={() => Router.push('/boards/2')}>개발관련</Item>
        //             <Item current={useRouter().query.categoryId === '3'} onClick={() => Router.push('/boards/3')}>My Video</Item>
        //         </ul>
        //     </Side>
        //     <Content>
        //         {children}
        //     </Content>
            
        // </Container>
        // </>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;