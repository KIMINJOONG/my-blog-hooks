import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { LOAD_BOARD_LIST_REQUEST } from '../reducers/board';
import Link from 'next/link';
import { ContentHeader } from '../styled/common';
import styled from 'styled-components';

const BoardsList = styled.div`
    width: 100%;
    height: 70px;
    border: solid 1px #707070;
    margin-bottom: 10px;

    & p {
        text-align: left;
        color: #707070;
    }
`;



const boards = () => {
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.board);
    useEffect(() => {
        dispatch({
        type: LOAD_BOARD_LIST_REQUEST,
        });
    }, []);

    return (
        <div>
            <ContentHeader>
                <div className="topContainer">
                    <p className="top">공지사항</p>
                    <p>이벤트와 새로운 알림을 확인하세요</p>
                </div>
                <div className="menuContainer">
                    <span className="menu">
                        <Link href="/board">
                            <a>글쓰기</a>
                        </Link>
                    </span>
                </div>
            </ContentHeader>
            {boards && boards.map(board => (
                <BoardsList key={board._id}>
                    <p>{board.title}</p>
                    <p>{board.createdAt}</p>
                </BoardsList>
            ))}
        </div>
    )
}

export default boards;