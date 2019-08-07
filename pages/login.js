import React, { useCallback, useEffect } from 'react';
import { useInput } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REUQEST } from '../reducers/user';
import Router from "next/router";
import Link from 'next/link';

const Login = () => {
    const [id, onChangeId ] = useInput("");
    const [password, onChangePassword ] = useInput("");
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: LOGIN_REUQEST,
            data: {
                id,
                password
            }
        });
    }, [id, password]);

    useEffect(() => {
        if (userInfo) {
        Router.push("/");
        }
    }, [userInfo]);


    return (
        <>
            <form>
                <div>
                    <span>아이디 : </span>
                    <input 
                        type="text" 
                        name="id" 
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    <span>비밀번호 : </span>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={onChangePassword} 
                    />
                </div>
                <div>
                    <Link href="/join">
                        <a>회원이 아니신가요?</a>
                    </Link>
                </div>
                <div>
                    <button onClick={onSubmitForm}>
                        로그인
                    </button>
                </div>
            </form>
        </>
    );
};

export default Login;