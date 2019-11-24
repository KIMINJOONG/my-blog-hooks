import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { LOGOUT_REQUEST } from '../reducers/user';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Drawer } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Container = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

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
    ${props => (props.current ? '#3498db' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
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
      type: LOGOUT_REQUEST,
    });
  }, []);
  const { userInfo } = useSelector(state => state.user);

  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  return (
    <Layout style={{ height: '800px' }}>
      <Header style={{ background: 'white' }}>
        <Row>
          <Col xs={1} md={0}>
            <Icon type="menu-fold" onClick={showDrawer}></Icon>
          </Col>
          <Col
            xs={20}
            md={23}
            onClick={() => Router.push('/')}
            style={{ textAlign: 'center' }}
          >
            <span>KOHUBI'S BLOG</span>
          </Col>
          <Col xs={1} md={1}>
            {userInfo ? (
              <Button onClick={onLogout}>로그아웃</Button>
            ) : (
              <Button onClick={() => Router.push('/login')}>로그인</Button>
            )}
          </Col>
        </Row>
      </Header>
      <Layout>
        <Row style={{ background: 'white' }}>
          <Col
            xs={0}
            md={2}
            style={{ height: 120, borderBottom: '1px solid gray' }}
          >
            <Item
              current={useRouter().query.categoryId === '1'}
              onClick={() => Router.push('/boards/1')}
            >
              일상
            </Item>
            <Item
              current={useRouter().query.categoryId === '2'}
              onClick={() => Router.push('/boards/2')}
            >
              개발관련
            </Item>
            <Item
              current={useRouter().query.categoryId === '3'}
              onClick={() => Router.push('/boards/3')}
            >
              My Video
            </Item>
          </Col>
          <Col>
            <Drawer
              title="Kohubi's Blog"
              placement="left"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Item
                current={useRouter().query.categoryId === '1'}
                onClick={() => Router.push('/boards/1')}
              >
                일상
              </Item>
              <Item
                current={useRouter().query.categoryId === '2'}
                onClick={() => Router.push('/boards/2')}
              >
                개발관련
              </Item>
              <Item
                current={useRouter().query.categoryId === '3'}
                onClick={() => Router.push('/boards/3')}
              >
                My Video
              </Item>
            </Drawer>
          </Col>
          <Col xs={24} md={20} style={{ background: 'white', height: '800px' }}>
            <Content style={{ padding: 15 }}>{children}</Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
