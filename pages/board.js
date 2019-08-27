import { useCallback, useEffect }from 'react';
import { useInput } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_BOARD_REQUEST } from '../reducers/board';
import Router from "next/router";
import BoardForm from '../components/BoardForm';

const Board = () => {
    const [ title, onChangeTitle] = useInput("");
    const [ content, onChangeContent ] = useInput("");
    const [ category, onChangeCategory ] = useInput('');
    const { isUpload } = useSelector(state => state.board);
    const dispatch = useDispatch();
    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: UPLOAD_BOARD_REQUEST,
            data: {
                title,
                content,
                category
            }
        });
    }, [title, content, category]);

    useEffect(() => {
        if(isUpload) {
            alert('게시글이 등록되었습니다.');
            Router.push('/boards');
        }
    })

    return (
        <div>
            <BoardForm 
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onChangeCategory={onChangeCategory}
                title={title}
                content={content}
                category={category}
                onSubmitForm={onSubmitForm}
            />
            
        </div>
    )

}

export default Board;