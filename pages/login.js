import React, { useCallback, useEffect } from 'react';
import { useInput } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REUQEST } from '../reducers/user';
import Router from 'next/router';
import Link from 'next/link';
import { message, Input, Row, Col } from 'antd';
import { Button } from 'antd/lib/radio';
import axios from 'axios';

const Login = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const onSubmitForm = useCallback(
    async e => {
      e.preventDefault();
      if (id === '') {
        message.error('아이디를 입력해주세요');
        return;
      }
      if (password === '') {
        message.error('비밀번호를 입력해주세요');
        return;
      }
      const loginData = {
        id,
        password,
      };
      const result = await axios.post('/user/login', loginData, {
        withCredentials: true,
      });
      if (result) {
        if (!result.data.success) {
          message.error(result.data.msg);
        } else {
          message.success('로그인 되었습니다.');
          Router.push('/');
        }
      }
    },
    [id, password],
  );

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onSubmitForm(e);
    }
  };

  useEffect(() => {
    if (userInfo) {
      message.success('로그인 되었습니다.');
      Router.push('/');
    }
  }, [userInfo]);

  return (
    <>
      <form>
        <Row>
          <Col md={8}></Col>

          <Col md={8}>
            <Row>
              <Col>
                <Input
                  placeholder="아이디를 입력해주세요."
                  onChange={onChangeId}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 10, marginTop: 10 }}>
              <Col>
                <Input.Password
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onChangePassword}
                  onKeyPress={onKeyPress}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href="/join">
                  <a>회원이 아니신가요?</a>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={onSubmitForm}>로그인</Button>
              </Col>
            </Row>
          </Col>

          <Col md={8}></Col>
        </Row>
      </form>
    </>
  );
};

export default Login;
