import { ContentTextArea,  TitleInput} from '../styled/common';
const BoardForm = ({
    onChangeTitle,
    onChangeContent,
    onSubmitForm,
    title,
    content,
    isUpdate=false
}) => {
    return(
        <form onSubmit={onSubmitForm}>
            <div>
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