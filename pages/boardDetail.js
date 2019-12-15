import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import ReactPlayer from 'react-player';
import InstagramEmbed from 'react-instagram-embed';
import { message, Button, Typography, Row, Col } from 'antd';
import { useInput } from '../util';
import { USER_DETAIL_REQUEST } from '../reducers/user';
import {
  LOAD_BOARD_DETAIL_REQUEST,
  DELETE_BOARD_REQUEST,
  ADD_COMMENT_REQUEST,
} from '../reducers/board';

const ButtonContainer = styled.div``;

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
  const [comment, setComment] = useState('');

  const onDeleteBoard = useCallback(boardId => () => {
    dispatch({
      type: DELETE_BOARD_REQUEST,
      data: boardId,
    });
    message.success('삭제되었습니다.');
    Router.push('/boards');
  });

  const onChangeComment = useCallback(e => {
    setComment(e.target.value);
  }, []);
  const postComment = useCallback(() => {
    if (userInfo) {
      const {
        router: {
          query: { id: boardId },
        },
      } = Router;
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          comment,
          boardId,
        },
      });
      setComment('');
    } else {
      message.error('로그인이 필요합니다.');
    }
  }, [comment, userInfo]);

  return (
    <div>
      {boardDetail && (
        <div>
          <Typography.Title>{boardDetail.title}</Typography.Title>
          <Typography.Text>
            {boardDetail.content &&
              boardDetail.content.length > 0 &&
              boardDetail.content.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
          </Typography.Text>
          <div>
            {boardDetail.images &&
              boardDetail.images.map(image => (
                <div key={image._id} style={{ display: 'inline-block' }}>
                  <img
                    src={image.src}
                    style={{ width: '200px' }}
                    alt={image.src}
                  />
                </div>
              ))}
          </div>
          {boardDetail.videoUrl && (
            <Row>
              <Col>
                <ReactPlayer url={boardDetail.videoUrl} controls />
              </Col>
            </Row>
          )}
          {boardDetail.instaUrl && (
            <Row>
              <InstagramEmbed
                url="https://www.instagram.com/p/B3O9tAFptbx/?hl=ko"
                maxWidth={320}
                hideCaption={false}
                containerTagName="div"
                protocol=""
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </Row>
          )}
          <hr />
          {boardDetail.comments.map((comments, index) => (
            <div key={index}>
              <span>{comments.creator.id} :</span>
              <span>{comments.text}</span>
            </div>
          ))}
          <div>
            <div>
              {userInfo ? (
                <>
                  <TextArea value={comment} onChange={onChangeComment} />
                  <div>
                    <Button type="primary" onClick={postComment}>
                      등록
                    </Button>
                  </div>
                </>
              ) : (
                <TextArea value="로그인이 필요합니다." readOnly />
              )}
            </div>
          </div>

          {userInfo && userInfo.id === 'master' && (
            <ButtonContainer>
              <Button
                type="primary"
                onClick={() => Router.push(`/board/${boardDetail._id}/update`)}
              >
                수정
              </Button>
              <Button type="danger" onClick={onDeleteBoard(boardDetail._id)}>
                삭제
              </Button>
            </ButtonContainer>
          )}
        </div>
      )}
    </div>
  );
};

boardDetail.getInitialProps = async context => {
  context.store.dispatch({
    type: USER_DETAIL_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_BOARD_DETAIL_REQUEST,
    data: context.query.id,
  });
};
export default boardDetail;
