import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_BOARD_DETAIL_REQUEST, DELETE_BOARD_REQUEST, ADD_COMMENT_REQUEST } from '../reducers/board';
import styled from 'styled-components';
import Router from 'next/router';
import { USER_DETAIL_REQUEST } from '../reducers/user';
import { useInput } from '../util';
import ReactPlayer from 'react-player';

const ButtonContainer = styled.div`

`;

const TextArea = styled.textarea`
    width: 100%;
    margin-top: 20px;
`;

const Pre = styled.pre`
    font-size: 15px;
`;

const boardDetail = () => {
    const { boardDetail } = useSelector(state => state.board);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [ comment, onChangeComment ] = useInput("");

    const onDeleteBoard = useCallback(boardId => () => {
        dispatch({
          type: DELETE_BOARD_REQUEST,
          data: boardId
        });
        alert('삭제되었습니다.');
        Router.push('/boards');
      });

    const postComment = useCallback(() => {
        if(userInfo) {
            const { router : { query : { id : boardId } } } = Router;
            dispatch({
                type: ADD_COMMENT_REQUEST,
                data: {
                    comment,
                    boardId
                }
            });
            alert('댓글이 등록되었습니다.');
        } else {
            alert('로그인이 필요합니다.');
        }
    }, [comment, userInfo]);

    return (
        <div>
            {
                boardDetail && (
                    <div>
                        <h1>{boardDetail.title}</h1>
                        {boardDetail.content && boardDetail.content.length > 0 && boardDetail.content.split('\n').map((line, index) => {
                            return (
                                <Pre key={index}>{line}</Pre>
                            )
                        })}
                        <div>
                            {
                                boardDetail.images && boardDetail.images.map(image => (
                                    <div key={image._id} style={{ display: "inline-block" }}>
                                        <img
                                            src={image.src}
                                            style={{ width: "200px" }}
                                            alt={image.src}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        {  boardDetail.videoUrl && (
                            <div>
                                <ReactPlayer 
                                    url={boardDetail.videoUrl}
                                    controls
                                />
                            </div>
                        )}
                        <hr/>
                        {
                            boardDetail.comments.map((comments, index) => {
                                return (
                                    <div key={index}>
                                        <span>{ comments.creator.id } : </span>
                                        <span>{ comments.text }</span>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <div>
                                {
                                    userInfo ? (
                                        <TextArea value={comment} onChange={onChangeComment} />
                                    ) : (
                                        <TextArea value={'로그인이 필요합니다.'} readOnly />
                                    )
                                }
                                
                            </div>
                            <div>
                                <button onClick={postComment}>등록</button>
                            </div>
                        </div>

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
        type: USER_DETAIL_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_BOARD_DETAIL_REQUEST,
        data: context.query.id
    });
}
export default boardDetail;