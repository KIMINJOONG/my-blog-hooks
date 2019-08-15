const BoardForm = ({
    onChangeTitle,
    onChangeContent,
    onSubmitForm,
    title,
    content
}) => {
    return(
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
    );
}
export default BoardForm;