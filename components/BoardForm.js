import { ContentTextArea,  TextInput} from '../styled/common';
import { useCallback } from 'react';
const BoardForm = ({
    onChangeTitle,
    onChangeContent,
    onChangeCategory,
    onSubmitForm,
    title,
    content,
    category=-1,
    isUpdate=false,
    imageInput,
    onChangeImages,
    onClickImageUpload,
    imagePaths,
    onRemoveImage,
    onChangeVideoUrl,
    videoUrl
}) => {
    return(
        <form onSubmit={onSubmitForm}>
            <div>
                <select onChange={onChangeCategory} value={category}>
                    <option value="-1">= 선택해주세요 =</option>
                    <option value="1">일상</option>
                    <option value="2">언어</option>
                    <option value="3">비디오</option>
                </select>
                <TextInput 
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="제목을 입력해주세요."
                />
            </div>
            <div>
                <TextInput type="text" onChange={onChangeVideoUrl} value={videoUrl} placeholder='유튜브 url을 등록해주세요.' />
            </div>
            <div>
                <input type="file"  hidden ref={imageInput} onChange={onChangeImages} />
                <div onClick={onClickImageUpload}>이미지 업로드</div>
            </div>
            <div>
                {imagePaths.map((v, i) => {
                return (
                    <div key={i} style={{ display: "inline-block" }}>
                    <img
                        src={v}
                        style={{ width: "200px" }}
                        alt={v}
                    />
                    <div>
                        <span onClick={onRemoveImage(v[i], i)}>제거</span>
                    </div>
                    </div>
                );
                })}
            </div>
            <div>
                <ContentTextArea 
                    name="content"
                    value={content}
                    onChange={onChangeContent}
                    placeholder="내용을 입력해주세요."
                />
            </div>
            <div>
                {
                    isUpdate ? (
                        <button>
                            게시글 수정
                        </button>
                    ) : (
                        <button>
                            게시글 등록
                        </button>
                    )
                }
            </div>
            
            
        </form>
    );
}
export default BoardForm;