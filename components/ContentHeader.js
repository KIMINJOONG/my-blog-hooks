import React, { useEffect } from 'react';
import { ContentHeaderContainer } from '../styled/common';
import { useSelector } from 'react-redux';
import Router from 'next/router';


const ContentHeader = ({bigTitle}) => {
    const { userInfo } = useSelector(state => state.user);
    return (
        <ContentHeaderContainer>
            <div className="topContainer">
                <p className="top">{bigTitle}</p>
                {
                    userInfo && ( 
                        <div>
                            <span onClick={ () => Router.push('/board') }>글쓰기</span>
                        </div>
                    )
                }
                
            </div>
            <div className="contentContainer">
                <div className="title">
                    <p>제목</p>
                </div>
                <div className="date">
                    <p>등록일</p>
                </div>
            </div>
        </ContentHeaderContainer>
    )
};

export default ContentHeader;