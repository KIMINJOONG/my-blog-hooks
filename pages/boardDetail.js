import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_BOARD_DETAIL_REQUEST, DELETE_BOARD_REQUEST } from '../reducers/board';
import styled from 'styled-components';
import Router from 'next/router';

const ButtonContainer = styled.div`

`;

const boardDetail = () => {
    const { boardDetail } = useSelector(state => state.board);
    const dispatch = useDispatch();

    const onDeleteBoard = useCallback(boardId => () => {
        dispatch({
          type: DELETE_BOARD_REQUEST,
          data: boardId
        });
        alert('삭제되었습니다.');
        Router.push('/boards');
      });

    return (
        <div>
            {
                boardDetail && (
                    <div>
                        <p>{boardDetail.title}</p>
                        {boardDetail.content.split('\n').map((line, index) => {
                            return (
                                <span key={index}>{line}<br/></span>
                            )
                        })}
                        <ButtonContainer>
                            <button onClick={() => Router.push(`/board/${boardDetail._id}/update`)}>수정</button>
                            <button onClick={onDeleteBoard(boardDetail._id)}>삭제</button>
                        </ButtonContainer>
                    </div>
                    
                )
            }
        </div>
    );
}

boardDetail.getInitialProps = async(context) => {
    console.log('boardDetail들어옴');
    context.store.dispatch({
        type: LOAD_BOARD_DETAIL_REQUEST,
        data: context.query.id
    });
    return { id: parseInt(context.query.id, 10)};
}
export default boardDetail;