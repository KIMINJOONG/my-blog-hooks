import { useCallback, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../util';
import {
  UPLOAD_BOARD_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE_REQUEST,
} from '../reducers/board';
import BoardForm from '../components/BoardForm';
import Router from 'next/router';
import { message } from 'antd';
import axios from 'axios';

const Board = () => {
  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const [videoUrl, onChangeVideoUrl] = useInput('');
  const [editorHtml, setEditorHtml] = useState('');
  const { imagePaths, isUpload } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []); // 실무에서는 이미지만 미리 먼저올려놓는 작업을 함

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);

  const onSubmitForm = useCallback(
    async e => {
      e.preventDefault();
      if (editorHtml === '') {
        message.error('내용을 입력해주세요.');
        return;
      }
      if (title === '') {
        message.error('제목을 입력해주세요.');
        return;
      }
      if (category === '') {
        message.error('카테고리를 선택해주세요.');
        return;
      }
      if (category === '3') {
        if (videoUrl === '') {
          message.error('유튜브주소를 입력해주세요.');
          return;
        }
      }
      const formData = new FormData();
      imagePaths.forEach(i => {
        formData.append('fileUrls', i);
      });
      formData.append('title', title);
      formData.append('category', category);
      formData.append('videoUrl', videoUrl);
      formData.append('content', editorHtml);
      const result = await axios.post('/board', formData, {
        withCredentials: true,
      });
      if (result && result.data && result.data.success) {
        Router.push('/boards/1');
      }
    },
    [title, content, category, videoUrl, editorHtml],
  );

  // 패턴
  // onRemoveImage(i) 처럼 괄호가 있으면 ()를 한번더 붙여주는게 패턴이다. 기억하기 고차함수라고 한다.
  const onRemoveImage = useCallback(
    (src, index) => () => {
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
          index,
        },
      });
    },
    [],
  );
  const handleChange = html => {
    setEditorHtml(html);
  };
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
        onChangeVideoUrl={onChangeVideoUrl}
        videoUrl={videoUrl}
        handleChange={handleChange}
        editorHtml={editorHtml}
      />
    </div>
  );
};

export default Board;
