import React from 'react';

const Join = () => {
    return (
        <>
            <form>
                <div>
                    <span>아이디 : </span>
                    <input type="text" placeholder="아이디를 입력해주세요." />
                </div>
                <div>
                    <span>비밀번호 : </span>
                    <input type="text" placeholder="패스워드를 입력해주세요." />
                </div>
                <div>
                    <span>비밀번호 확인 : </span>
                    <input type="password" placeholder="패스워드를 다시입력해주세요" />
                </div>
                <div>
                    <button>회원가입</button>
                    <button>취소</button>
                </div>
            </form>
        </>
    );
};

export default Join;