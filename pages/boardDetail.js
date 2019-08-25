import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_BOARD_DETAIL_REQUEST, DELETE_BOARD_REQUEST } from '../reducers/board';
import styled from 'styled-components';
import Router from 'next/router';
import { USER_DETAIL_REQUEST } from '../reducers/user';

const ButtonContainer = styled.div`

`;

const boardDetail = () => {
    const { boardDetail } = useSelector(state => state.board);
    const { userInfo } = useSelector(state => state.user);
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
                        <h1>{boardDetail.title}</h1>
                        {boardDetail.content.split('\n').map((line, index) => {
                            return (
                                <span key={index}>{line}<br/></span>
                            )
                        })}

                        { userInfo && userInfo.id === 'master' && (
                            <ButtonContainer>
                                <button onClick={() => Router.push(`/board/${boardDetail._id}/update`)}>수정</button>
                                <button onClick={onDeleteBoard(boardDetail._id)}>삭제</button>
                            </ButtonContainer>
                        )}
                    </div>
                    
                )
            }
        </div>
    );
}

boardDetail.getInitialProps = async(context) => {
    context.store.dispatch({
        type: LOAD_BOARD_DETAIL_REQUEST,
        data: context.query.id
    });
    context.store.dispatch({
        type: USER_DETAIL_REQUEST,
    });
}
export default boardDetail;