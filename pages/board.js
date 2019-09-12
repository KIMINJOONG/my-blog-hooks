import { useCallback, useRef, useEffect }from 'react';
import { useInput } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_BOARD_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, REMOVE_IMAGE_REQUEST } from '../reducers/board';
import BoardForm from '../components/BoardForm';
import Router from "next/router";

const Board = () => {
    const [ title, onChangeTitle] = useInput('');
    const [ content, onChangeContent ] = useInput('');
    const [ category, onChangeCategory ] = useInput('');
    const { imagePaths, isUpload } = useSelector(state => state.board);
    const dispatch = useDispatch();
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


    const onSubmitForm = useCallback(e => {
        e.preventDefault();
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('fileUrls', i);
        });
        formData.append('content', content);
        formData.append('title', title);
        formData.append('category', category);
        dispatch({
            type: UPLOAD_BOARD_REQUEST,
            data: formData
        });
        
    }, [title, content, category]);

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
                imageInput={imageInput}
                onChangeImages={onChangeImages}
                onClickImageUpload={onClickImageUpload}
                imagePaths={imagePaths}
                onRemoveImage={onRemoveImage}
            />
            
        </div>
    )

}

export default Board;