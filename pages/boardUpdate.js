import { useSelector, useDispatch } from 'react-redux';
import BoardForm from "../components/BoardForm";
import { useInput } from '../util';
import { LOAD_BOARD_DETAIL_REQUEST, MODIFY_BOARD_REQUEST } from '../reducers/board';
import { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';

const boardUpdate = () => {
    const { boardDetail, isModify } = useSelector(state => state.board);
    const [ title, onChangeTitle ] = useInput(boardDetail.title);
    const [ content, onChangeContent ] = useInput(boardDetail.content);
    const [ category, onChangeCategory ] = useInput(boardDetail.category);
    const { imagePaths } = useSelector(state => state.board);
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

    const imageInput = useRef();

    const onChangeImages = useCallback(e => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);
        });
        dispatch({
          type: UPLOAD_IMAGES_REQUEST,
          data: imageFormData,
        });
      }, []); // 실무에서는 이미지만 미리 먼저올려놓는 작업을 함

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput]);

    // 패턴
  // onRemoveImage(i) 처럼 괄호가 있으면 ()를 한번더 붙여주는게 패턴이다. 기억하기 고차함수라고 한다.
    const onRemoveImage = useCallback( (src, index) => () => {
        let fileName = src.split('images/');
        fileName = fileName[1];
        // dispatch({
        // type: REMOfVE_IMAGE,
        // index
        // });
        dispatch({
            type: REMOVE_IMAGE_REQUEST,
            data: {
                fileName,
                index
            }
        });

    }, []);

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
                onChangeCategory={onChangeCategory}
                title={title}
                content={content}
                category={category}
                onSubmitForm={onSubmitForm}
                imageInput={imageInput}
                onChangeImages={onChangeImages}
                onClickImageUpload={onClickImageUpload}
                imagePaths={imagePaths}
                onRemoveImage={onRemoveImage}
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