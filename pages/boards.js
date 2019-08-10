import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { LOAD_BOARD_LIST_REQUEST } from '../reducers/board';
import styled from 'styled-components';
import Router from 'next/router';
import ContentHeader from '../components/ContentHeader';

const BoardsList = styled.div`
    width: 100%;
    height: 51px;
    border-bottom: solid 1px #cecece;

    & div {
        display: inline-block;
    }

    & .title {
        width: 80%;
        p {
            text-align: left;
        }
    }
    & .date {
        width: 20%;
        p {
            text-align: center;
        }
    }

    & p {
        color: #000000;
        padding: 0px;
        margin: 0px;
        line-height: 51px;
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
            <ContentHeader bigTitle={"공지사항"} smallTitle={"다양한 이벤트와 공지사항을 받아보세요."}/>
            {boards && boards.map(board => (
                <BoardsList key={board._id} onClick={() => Router.push(`/boards/${board._id}`)}>
                    <div className="title">
                        <p>{board.title}</p>
                    </div>
                    <div className="date">
                        <p>{board.createdAt.length < 10 ? board.createdAt : board.createdAt.substring(0, 10)}</p>
                    </div>
                </BoardsList>
            ))}
        </div>
    )
}

export default boards;