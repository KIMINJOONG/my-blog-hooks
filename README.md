# 블로그만들기

## react, react-hooks, redux, next


# to do
- [x] 회원가입 기능
- [x] 로그인 기능
- [x] 로그아웃 기능
- [ ] 게시글 리스트 기능
- [ ] 게시글 상세 기능
- [ ] 게시글 수정 기능
- [ ] 게시글 삭제 기능
- [ ] 이미지 업로드 기능
- [ ] 이미지 슬라이드 기능
- [ ] 이미지 확대 기능
- [ ] 댓글 기능


# 내가 실수한것들
서버사이드 렌더링시 무한 리퀘스트를 날렸었다...5시간을 헤멨는데 결국 찾은 이유는
```
const result = yield call(loadBoardAPI);
        yield put({
            type: LOAD_BOARD_LIST_SUCCESS,
            data: result.data
        });
        Router.push('/boards');
```
- Rouer가 저기서 다시 푸쉬를 해주고있었다... 자신한테 농락당한 기분이다..