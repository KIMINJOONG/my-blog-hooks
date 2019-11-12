import { Input, Row, Col, Button } from "antd";
import styled from 'styled-components';
import Router from 'next/router';

export default ({
    onSubmit, 
    id, 
    onChangeId, 
    password, 
    onChangePassword, 
    onChangePasswordCheck,
    passwordError
}) => {
    const JoinRow = styled(Row)`
        margin-top: 10px;
    `;

    return (
            <form onSubmit={onSubmit}>
                <Row>
                    <Col md={8}>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col>
                                <Input 
                                    type="text" 
                                    name="userId" 
                                    placeholder="아이디를 입력해주세요." 
                                    onChange={onChangeId}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input.Password
                                    type="password" 
                                    name="userPassword" 
                                    onChange={onChangePassword}
                                    placeholder="패스워드를 입력해주세요." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input.Password
                                    type="password" 
                                    name="userPassword2"
                                    onChange={onChangePasswordCheck} 
                                    placeholder="패스워드를 다시입력해주세요" />
                                {passwordError && (
                                    <div style={{ color: "red"}}>비밀번호가 일치하지 않습니다.</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={onSubmit}>회원가입</Button>
                                <Button onClick={() => Router.push('/login')}>취소</Button>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col md={8}>
                    </Col>
                </Row>
            </form>
    )
}