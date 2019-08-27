import { ContentTextArea,  TitleInput} from '../styled/common';
const BoardForm = ({
    onChangeTitle,
    onChangeContent,
    onChangeCategory,
    onSubmitForm,
    title,
    content,
    category,
    isUpdate=false
}) => {
    return(
        <form onSubmit={onSubmitForm}>
            <div>
                <select onChange={onChangeCategory} value={category}>
                    <option value="-1" selected>= 선택해주세요 =</option>
                    <option value="1">일상</option>
                    <option value="2">언어</option>
                </select>
                <TitleInput 
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="제목을 입력해주세요."
                />
            </div>
            <div>
                <ContentTextArea 
                    name="content"
                    value={content}
                    onChange={onChangeContent}
                    placeholder="내용을 입력해주세요."
                />
            </div>
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
            
        </form>
    );
}
export default BoardForm;