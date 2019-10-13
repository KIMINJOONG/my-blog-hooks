import React, {useState, useCallback, useEffect } from 'react';
import { joinUserAction } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";
import {useInput} from '../util';
import { message } from 'antd';
import JoinForm from '../components/JoinForm';

const Join = () => {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const { isJoin, userInfo } = useSelector(state => state.user);

    

    useEffect(() => {
        if (userInfo) {
            alert("이미 로그인된 유저입니다.");
            Router.push("/");
        }
    }, [isJoin]);

    const [id, onChangeId] = useInput("");
    const [password, onChangePassword] = useInput("");
    const dispatch = useDispatch();
    
    const onSubmit = useCallback(e => {
        e.preventDefault();
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        dispatch(
            joinUserAction({
                id,
                password,
            }),
        );
        message.success('회원가입이 완료되었습니다.');
        Router.push("/");
    },[password, passwordCheck]
    );

    const onChangePasswordCheck = useCallback(e => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback(e => {
        setTermError(false);
        setTerm(e.target.value);
    }, []);

    return (
        <>
            <JoinForm 
                onSubmit={onSubmit}
                id={id}
                onChangeId={onChangeId}
                password={password}
                onChangePassword={onChangePassword}
                onChangePasswordCheck={onChangePasswordCheck}
                passwordError={passwordError}
            />
        </>
    );
};

export default Join;