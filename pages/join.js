import React, {useState, useCallback, useEffect } from 'react';
import { joinUserAction } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";

const Join = () => {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const { isJoin } = useSelector(state => state.user);

    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback(e => {
            setter(e.target.value);
        }, []);
        return [value, handler];
    };

    useEffect(() => {
        if (isJoin) {
        alert("회원가입이 완료되었으니 로그인해주시기 바랍니다.");
        Router.push("/login");
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
            <form onSubmit={onSubmit}>
                <div>
                    <span>아이디 : </span>
                    <input 
                        type="text" 
                        value={id} 
                        name="userId" 
                        placeholder="아이디를 입력해주세요." 
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    <span>비밀번호 : </span>
                    <input 
                        type="password" 
                        value={password} 
                        name="userPassword" 
                        onChange={onChangePassword}
                        placeholder="패스워드를 입력해주세요." />
                </div>
                <div>
                    <span>비밀번호 확인 : </span>
                    <input 
                        type="password" 
                        name="userPassword2"
                        onChange={onChangePasswordCheck} 
                        placeholder="패스워드를 다시입력해주세요" />
                </div>
                {passwordError && (
                    <div style={{ color: "red"}}>비밀번호가 일치하지 않습니다.</div>
                )}
                <div>
                    <button>회원가입</button>
                    <button>취소</button>
                </div>
            </form>
        </>
    );
};

export default Join;