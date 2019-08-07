import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { LOAD_BOARD_LIST_REQUEST } from '../reducers/board';



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
            {boards && boards.map(board => (
                <div>
                    {board.title}
                </div>
            ))}
        </div>
    )
}

export default boardList;