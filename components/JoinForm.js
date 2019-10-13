export default ({
    onSubmit, 
    id, 
    onChangeId, 
    password, 
    onChangePassword, 
    onChangePasswordCheck,
    passwordError
}) => {
    return (
            <form onSubmit={onSubmit}>
                <div>
                    <span>아이디 : </span>
                    <input 
                        type="text" 
                        value={id} 
                        name="userId" 
                        placeholder="아이디를 입력해주세요." 
                        onChange={onChangeId}
                    />
                </div>
                <div>
                    <span>비밀번호 : </span>
                    <input 
                        type="password" 
                        value={password} 
                        name="userPassword" 
                        onChange={onChangePassword}
                        placeholder="패스워드를 입력해주세요." />
                </div>
                <div>
                    <span>비밀번호 확인 : </span>
                    <input 
                        type="password" 
                        name="userPassword2"
                        onChange={onChangePasswordCheck} 
                        placeholder="패스워드를 다시입력해주세요" />
                </div>
                {passwordError && (
                    <div style={{ color: "red"}}>비밀번호가 일치하지 않습니다.</div>
                )}
                <div>
                    <button>회원가입</button>
                    <button>취소</button>
                </div>
            </form>
    )
}