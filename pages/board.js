import React, { useCallback, }from 'react';
import { useInput } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_BOARD_REQUEST } from '../reducers/board';

const Board = () => {
    const [ title, onChangeTitle ] = useInput("");
    const [ content, onChangeContent ] = useInput("");
    const dispatch = useDispatch();
    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: UPLOAD_BOARD_REQUEST,
            data: {
                title,
                content
            }
        });
    }, [title, content]);

    return (
        <div>
            <form onSubmit={onSubmitForm}>
                <div>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </div>
                <div>
                    <textarea 
                        name="content"
                        value={content}
                        onChange={onChangeContent}
                    />
                </div>
                <button>
                    게시글 등록
                </button>
            </form>
            
        </div>
    )

}

export default Board;