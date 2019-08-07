import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { LOGOUT_REQUEST } from '../reducers/user';




const Home = () => {
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    }, []);
    return (
        <div>
            {
                userInfo ? (
                    <div>
                        <span>{userInfo.id}님 환영합니다.</span>
                        <span onClick={onLogout}>로그아웃</span>
                        <Link href="/board">
                            <a>글쓰기</a>
                        </Link>
                        <Link href="/boardList">
                            <a>게시판</a>
                        </Link>
                    </div>
                ) : (
                    <Link href="/login">
                        <a>로그인</a>
                    </Link>
                )
            }
            
        </div>
    )
}

export default Home;