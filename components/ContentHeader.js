import React from 'react';
import { ContentHeaderContainer } from '../styled/common';


const ContentHeader = ({bigTitle, smallTitle}) => (
    <ContentHeaderContainer>
        <div className="topContainer">
            <p className="top">{bigTitle}</p>
            <p>{smallTitle}</p>
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
);

export default ContentHeader;