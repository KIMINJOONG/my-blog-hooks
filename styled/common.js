import styled from 'styled-components';

export const ContentHeaderContainer = styled.div`
    width: 100%;

    & div {
        display: inline-block;
    }

    & .topContainer {
        width: 100%;
        height: 50px;

        & div {
            float: right;
            cursor: pointer;
        }
    }

    & .top {
        margin: 0px;
        font-size: 20px;
    }

    & .contentContainer {
        width: 100%;
        height: 40px;
        border-top: 1px solid #066306;
        border-bottom: 1px solid #cecece;

        & .title {
            width: 80%;
            line-height: 40px;
        }
        & .date {
            width: 20%;
            line-height: 40px;
        }

        & p {
            margin: 0px;
            text-align: center;
        }
    }

    & p {
        font-family: SegoeUI;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        text-align: left;
        color: #707070;
    }

    

`;



