import {  useSelector, useDispatch } from 'react-redux'; 
import { LOAD_BOARD_LIST_REQUEST } from '../reducers/board';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import ContentHeader from '../components/ContentHeader';
import { useCallback } from 'react';
import { useInput } from '../util';
import SearchForm from '../components/SearchForm';
import { Pagination, Row, Col } from 'antd';

const BoardsList = styled.div`
    width: 100%;
    height: 51px;
    border-bottom: solid 1px #cecece;
    cursor: pointer;

    & div {
        display: inline-block;
    }

    & .title {
        width: 80%;
        p {
            text-align: left;
            @media screen and (max-width: 768px) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                font-size: 1.0rem;
            }
        }
    }
    & .date {
        width: 20%;
        p {
            text-align: center;
            @media screen and (max-width: 768px) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 50px;
                font-size: 0.5rem;
            }
        }
    }

    & p {
        color: #000000;
        padding: 0px;
        margin: 0px;
        line-height: 51px;
    }
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 480px;
`;


const SearchContainer = styled.div`
    width: 100%;
    height: 30px;
    & > div {
        display: inline-block;
        position: absolute;
        left: 50%;
        margin-left: -30px;
    }

    & > div > input {
        width: 200px;
        height: 20px;
    }
`;



const boards = () => {
    const router = useRouter();
    const { categoryId } = router.query;
    const dispatch = useDispatch();
    const { boards, totalCount } = useSelector(state => state.board);
    const [searchValue, onChangeSearchValue ] = useInput("");
    const onClickSearch = useCallback(value => {
        Router.push(`/boards/${categoryId}?searchValue=${value}&page=1&pageNum=10`);
    }, [searchValue]);

    const onChangePage = useCallback((page) => {
       dispatch({
            type: LOAD_BOARD_LIST_REQUEST,
            data: {
                searchValue,
                categoryId,
                page,
                pageNum: 10
            }
       });
    },[categoryId, searchValue]);
    return (
        <div>
            <div style={{height: '660px'}}>
                <ContentHeader bigTitle={(categoryId === '1' ? '일상' : categoryId === '2' ? '개발 관련' : 'My Video')} />
                <Row>
                    {boards && boards.map(board => (
                        <BoardsList key={board._id} onClick={() => Router.push(`/board/${board._id}`)}>
                            <div className="title">
                                <p>{board.title}</p>
                            </div>
                            <div className="date">
                                <p>{board.createdAt.length < 10 ? board.createdAt : board.createdAt.substring(0, 10)}</p>
                            </div>
                        </BoardsList>
                    ))}
                </Row>
            </div>
            <Row>
                <Col>
                    <SearchForm searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} onClickSearch={onClickSearch} />
                </Col>
            </Row>
            <Row style={{marginTop: 10}}>
                <Col md={24} style={{textAlign: 'center'}}>
                    <Pagination onChange={onChangePage} defaultCurrent={1} total={totalCount} />
                </Col>
                
            </Row>
        </div>
        
    )
}

// _app.js설정이후 서버사이드렌더링으로 디스패치 불러오는부분
// getInitialprops => next에서 임의로 추가한 라이프 싸이클 componentdidmount보다 더 빨리 실행됨
// 서버사이드 렌더링 서버쪽 데이터를 미리 불러와서 렌더링해줄때 유용
// 서버쪽에서 페이지를 처음으로 불러올때 실행
// 프론트에서 페이지를 넘낟즐때 프론트에서 실행
boards.getInitialProps = async (context) => {
    const { query : { searchValue } } = context;
    const {
        req: {
            params : { categoryId }
        } 
    } = context;
    context.store.dispatch({
      type: LOAD_BOARD_LIST_REQUEST,
      data: {
          searchValue,
          categoryId,
          page: 1,
          pageNum: 10
      }
    });
};

export default boards;