import { useSelector, useDispatch } from 'react-redux';
import BoardForm from "../components/BoardForm";
import { useInput } from '../util';
import { LOAD_BOARD_DETAIL_REQUEST, MODIFY_BOARD_REQUEST } from '../reducers/board';
import { useCallback, useEffect } from 'react';
import Router from 'next/router';

const boardUpdate = () => {
    const { boardDetail, isModify } = useSelector(state => state.board);
    const [ title, onChangeTitle ] = useInput(boardDetail.title);
    const [ content, onChangeContent ] = useInput(boardDetail.content);
    const dispatch = useDispatch();
    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        const { router : { query : { id : boardId } } } = Router;
        dispatch({
            type: MODIFY_BOARD_REQUEST,
            data: {
                boardId,
                title,
                content
            }
        });
    }, [title, content]);

    useEffect(() => {
        if(isModify) {
            alert('수정되었습니다.');
            Router.push('/boards');
        }
    });
    
    return (
        <div>
            <BoardForm
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onSubmitForm={onSubmitForm}
                title={title}
                content={content}
                isUpdate={true}
            />
        </div>
    );
}

boardUpdate.getInitialProps = async(context) => {
    context.store.dispatch({
        type: LOAD_BOARD_DETAIL_REQUEST,
        data: context.query.id
    });
    return { id: parseInt(context.query.id, 10)};
}

export default boardUpdate;