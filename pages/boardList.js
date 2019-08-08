import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { LOAD_BOARD_LIST_REQUEST } from '../reducers/board';
import Link from 'next/link';

const boardList = () => {
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.board);
    useEffect(() => {
        dispatch({
        type: LOAD_BOARD_LIST_REQUEST,
        });
    }, []);
    return (
        <div>
            <div>
                <Link href="/board">
                    <a>글쓰기</a>
                </Link>
            </div>
            {boards && boards.map(board => (
                <div key={board._id}>
                    {board.title}
                </div>
            ))}
        </div>
    )
}

export default boardList;